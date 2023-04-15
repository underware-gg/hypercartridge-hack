import { renderText64 } from './Text64Node';
import './style.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appElement = document.querySelector<HTMLDivElement>('#app')!;

const startTime = Date.now();

async function renderLoop() {
  appElement.textContent = '';

  appElement.appendChild(
    renderApp(Date.now() - startTime),
  );

  requestAnimationFrame(renderLoop);
}

function renderApp(t: number) {
  return renderText64([80, 45], [
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
  ]);
}

requestAnimationFrame(renderLoop);
