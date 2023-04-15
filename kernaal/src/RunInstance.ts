import { Mutex } from 'wait-your-turn';
import Text64Node, { Trigger, getTriggers, renderText64 } from './Text64Node';
import VslibPool from './vslib/VslibPool';
import outroPng from '../../assets/outro.png';

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

  constructor(
    public pool: VslibPool,
    public cartridge: Record<string, string>,
    public loadCartridge: (cartridge: Record<string, string>) => void,
  ) {
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
      } else if ('loadCartridge' in trigger) {
        this.loadCartridge(trigger.loadCartridge);
      } else if ('deploy' in trigger) {
        this.deploy(trigger.deploy);
      }
    }
  };

  deploy(cartridge: Record<string, string>) {
    this.stop();

    // alert('Deploy now');

    // I have this app element in the html
    // appElement = document.querySelector<HTMLDivElement>('#app')!;
    // i'd like to remove it. you need to get it from the dom first
    // then you can remove it
    const appElement = document.querySelector<HTMLDivElement>('#app');
    if (appElement) {
      appElement.remove();
    }

    // now add an image element to the body where it takes up the full width and height
    const img = document.createElement('img');
    img.src = outroPng;
    // make the image take up the top section and be centered horizontally.
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, 0)';
    // make it maintain the aspect ratio but have room below
    // width can't be 100%
    img.style.width = 'auto';
    img.style.height = '80vh';
    document.body.appendChild(img);

    // set the background colour for the body to black
    document.body.style.backgroundColor = 'black';

    // now display some text over the top of the image in the centre
    const text = document.createElement('div');
    text.style.position = 'absolute';
    // put the text in the bottom 20vh of the screen
    text.style.top = '80vh';
    // translate it to the centre
    text.style.fontSize = '3rem';
    text.style.color = 'white';
    text.style.fontWeight = 'bold';

    text.textContent = 'Cartridge deployed!';
    text.style.left = '50%';
    text.style.transform = 'translate(-50%, 0)';
    // don't make the text wrap
    text.style.whiteSpace = 'nowrap';
    document.body.appendChild(text);

    // add some more text below that displays a smart contract address
    const contractAddress = document.createElement('div');
    contractAddress.style.position = 'absolute';
    // make the y be below the text
    // text is 80vh, this needs to be below that
    contractAddress.style.top = 'calc(80vh + 8rem)';
    contractAddress.style.left = '50%';
    contractAddress.style.transform = 'translate(-50%, -50%)';
    contractAddress.style.fontSize = '2rem';
    contractAddress.style.color = 'white';
    contractAddress.style.fontWeight = 'bold';

    contractAddress.textContent = '0x1234567890';
    document.body.appendChild(contractAddress);
  }

  stop() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('keydown', this.handleKeyDown);
    this.stopped = true;
  }

  async processOp(op: unknown) {
    await this.stateUpdateMutex.use(async () => {
      const result = await this.pool.run(
        '/update.ts',
        this.cartridge,
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
      this.cartridge,
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
