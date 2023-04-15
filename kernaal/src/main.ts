import { renderText64 } from './Text64Node';
import './style.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appElement = document.querySelector<HTMLDivElement>('#app')!;

appElement.appendChild(
  renderText64([80, 45], [
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
  ]),
);
