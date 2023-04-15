import { renderText64 } from './Text64Node';
import './style.css';

const canvasWidth = 80;
const canvasHeight = 45;

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
  appElement.textContent = '';

  appElement.appendChild(
    renderApp(Date.now() - startTime, cursorPos),
  );

  requestAnimationFrame(renderLoop);
}

function renderApp(t: number, cursorPos: [number, number]) {
  return renderText64([canvasWidth, canvasHeight], [
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
  ]);
}

requestAnimationFrame(renderLoop);
