import System from './System';
import defaultCartridge from './defaultCartridge';
import './style.css';
import VslibPool from './vslib/VslibPool';

const pool = new VslibPool();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const system = new System(pool, defaultCartridge);

const bgAudioEl = document.getElementById('bg-audio') as HTMLAudioElement;
let playStarted = false;

function renderLoop() {
  if (!playStarted) {
    if (bgAudioEl.currentTime !== 0) {
      playStarted = true;
    } else {
      bgAudioEl.play().catch(() => {});
    }
  }

  requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);
