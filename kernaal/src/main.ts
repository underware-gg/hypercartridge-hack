import RunInstance from './RunInstance';
import './style.css';
import VslibPool from './vslib/VslibPool';

const pool = new VslibPool();

const instance = new RunInstance(pool);

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
