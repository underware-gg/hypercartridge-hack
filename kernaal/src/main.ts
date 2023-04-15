import Text64Node, { renderText64 } from './Text64Node';
import './style.css';
import { renderTitle } from './components/title';
import VslibPool from './vslib/VslibPool';

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
  const result = await pool.run('/main.ts', {
    '/main.ts': `
      export default function main() {
        return 1 + 1;
      }
    `,
  }).wait();

  return [
    {
      pos: [10, 10],
      width: 100,
      text: 'HyperCartridge',
    },
    {
      pos: [10, 11],
      width: 1,
      text: 'yperCartridge',
    },
    Math.floor(t / 500) % 2 === 0 ? 
      {
        pos: [15, 15],
        width: 1,
        text: '░',
      } : [],
    {
      pos: cursorPos,
      width: 1,
      text: '█',
    },
    renderTitle(t, cursorPos),
    {
      pos: [20, 25],
      width: 100,
      text: `1 + 1 is ${JSON.stringify(result.output)}`,
    },
  ];
}

requestAnimationFrame(renderLoop);
