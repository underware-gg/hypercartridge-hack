import { Mutex } from 'wait-your-turn';
import Text64Node, { Trigger, getTriggers, renderText64 } from './Text64Node';
import VslibPool from './vslib/VslibPool';
import defaultCartridge from './defaultCartridge';

const canvasWidth = 80;
const canvasHeight = 45;

export default class RunInstance {
  startTime = Date.now();

  cursorPos: [number, number] = [
    Math.floor(canvasWidth / 2),
    Math.floor(canvasHeight / 2),
  ];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appElement = document.querySelector<HTMLDivElement>('#app')!;

  state: unknown = null;

  keyTriggers: Record<string, Trigger[]> = {};
  stateUpdateMutex = new Mutex();
  stopped = false;

  constructor(public pool: VslibPool) {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('keydown', this.handleKeyDown);
    window.requestAnimationFrame(this.renderLoop.bind(this));
  }

  handleMouseMove = (e: MouseEvent) => {
    const rect = this.appElement.getBoundingClientRect();
    
    this.cursorPos = [
      Math.floor(canvasWidth * (e.clientX - rect.left) / rect.width),
      Math.floor(canvasHeight * (e.clientY - rect.top) / rect.height),
    ];
  };

  handleKeyDown = async (e: KeyboardEvent) => {
    await this.processOp({ keyDown: e.key });

    for (const trigger of this.keyTriggers[e.key] ?? []) {
      if ('op' in trigger) {
        await this.processOp(trigger.op);
      }
    }
  };

  stop() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('keydown', this.handleKeyDown);
    this.stopped = true;
  }

  async processOp(op: unknown) {
    await this.stateUpdateMutex.use(async () => {
      const result = await this.pool.run(
        '/update.ts',
        defaultCartridge,
        [this.state, op],
      ).wait();
  
      if ('Err' in result.output) {
        console.error(result.output.Err);
        return;
      }
  
      this.state = JSON.parse(result.output.Ok);
    });
  }

  async renderLoop() {
    if (this.stopped) {
      return;
    }

    const node = await this.renderApp();

    this.keyTriggers = getTriggers(node);
    const newRender = renderText64([canvasWidth, canvasHeight], node);
    this.appElement.textContent = '';
    this.appElement.appendChild(newRender);
  
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  async renderApp(): Promise<Text64Node> {
    const result = await this.pool.run(
      '/render.ts',
      defaultCartridge,
      [this.state, Date.now() - this.startTime, this.cursorPos],
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
          pos: this.cursorPos,
          width: 1,
          text: '█',
        },
      ];
    }
  
    const node = JSON.parse(result.output.Ok);
  
    return node;
  }
}
