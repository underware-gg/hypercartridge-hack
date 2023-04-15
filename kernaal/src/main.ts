import './style.css';
import { setupCounter } from './counter.ts';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>HyperCartridge</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
