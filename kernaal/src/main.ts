import Text64Node, { Trigger, getTriggers, renderText64 } from './Text64Node';
import './style.css';
import VslibPool from './vslib/VslibPool';
import defaultCartridge from './defaultCartridge/index.ts';
import { Mutex } from 'wait-your-turn';

const canvasWidth = 80;
const canvasHeight = 45;

const pool = new VslibPool();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appElement = document.querySelector<HTMLDivElement>('#app')!;

const startTime = Date.now();

let cursorPos: [number, number] = [
  Math.floor(canvasWidth / 2),
  Math.floor(canvasHeight / 2),
];

window.addEventListener('mousemove', (e) => {
  const rect = appElement.getBoundingClientRect();

  cursorPos = [
    Math.floor(canvasWidth * (e.clientX - rect.left) / rect.width),
    Math.floor(canvasHeight * (e.clientY - rect.top) / rect.height),
  ];
});

let state: unknown = null;

let keyTriggers: Record<string, Trigger[]> = {};

const stateUpdateMutex = new Mutex();

async function processOp(op: unknown) {
  await stateUpdateMutex.use(async () => {
    const result = await pool.run(
      '/update.ts',
      defaultCartridge,
      [state, op],
    ).wait();

    if ('Err' in result.output) {
      console.error(result.output.Err);
      return;
    }

    state = JSON.parse(result.output.Ok);
  });
}

const bgAudioEl = document.getElementById('bg-audio') as HTMLAudioElement;
let playStarted = false;

window.addEventListener('keydown', async (e) => {
  await processOp({ keyDown: e.key });

  for (const trigger of keyTriggers[e.key] ?? []) {
    if ('op' in trigger) {
      await processOp(trigger.op);
    }
  }
});

async function renderLoop() {
  if (!playStarted) {
    if (bgAudioEl.currentTime !== 0) {
      playStarted = true;
    } else {
      bgAudioEl.play();
    }
  }

  const node = await renderApp(state, Date.now() - startTime, cursorPos);
  keyTriggers = getTriggers(node);
  const newRender = renderText64([canvasWidth, canvasHeight], node);
  appElement.textContent = '';
  appElement.appendChild(newRender);

  requestAnimationFrame(renderLoop);
}

async function renderApp(
  state: unknown,
  t: number,
  cursorPos: [number, number],
): Promise<Text64Node> {
  const result = await pool.run(
    '/render.ts',
    defaultCartridge,
    [state, t, cursorPos],
  ).wait();

  if ('Err' in result.output) {
    return [
      {
        pos: [0, 0],
        width: 100,
        text: `Error: ${result.output.Err}`,
      },
      Object.values(result.diagnostics).flat().map((d, i) => ({
        pos: [0, i + 1],
        width: 100,
        text: `  ${d.span.start}: ${d.level}: ${d.message}`,
      })),
      {
        pos: cursorPos,
        width: 1,
        text: '█',
      },
    ];
  }

  const node = JSON.parse(result.output.Ok);

  return node;
}

requestAnimationFrame(renderLoop);
