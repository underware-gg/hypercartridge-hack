import Text64Node, { renderText64 } from './Text64Node';
import './style.css';
import VslibPool from './vslib/VslibPool';
import renderSource from './defaultCartridge/render.ts?raw';

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

async function renderLoop() {
  const newRender = renderText64([canvasWidth, canvasHeight], await renderApp(Date.now() - startTime, cursorPos));
  appElement.textContent = '';
  appElement.appendChild(newRender);

  requestAnimationFrame(renderLoop);
}

async function renderApp(t: number, cursorPos: [number, number]): Promise<Text64Node> {
  const result = await pool.run('/render.ts', {
    '/render.ts': renderSource,
  }, [t, cursorPos]).wait();

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
