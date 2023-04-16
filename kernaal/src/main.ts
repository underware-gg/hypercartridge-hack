import System from './System';
import defaultCartridge from './defaultCartridge';
import './style.css';
import introGif from '../../assets/intro.gif';
import VslibPool from './vslib/VslibPool';

const bgAudioEl = document.getElementById('bg-audio') as HTMLAudioElement;
let playStarted = false;

// add a html image that takes up full width and height
const img = document.createElement('img');
// get the asset called 'intro.gif' from the assets folder
img.src = introGif;
// set the width and height to 100%
img.style.width = '100%';
img.style.height = '100%';

// add the image to the body
document.body.appendChild(img);

// add some text over the top that says press any key to continue
const text = document.createElement('div');
text.innerText = 'Press any key to start';
text.style.position = 'absolute';
text.style.top = '50%';
// make it bold text
text.style.fontWeight = '800';
// make the text bigger
text.style.fontSize = '1.5rem';
text.style.left = '50%';
text.style.transform = 'translateX(-50%)';

// add the text to the body
document.body.appendChild(text);

let bgAudioStarted = false;

// add an event listener for any key, when any key is pressed remove the image and text and stop playing the music.
document.addEventListener('keyup', async () => {
  if (bgAudioStarted) {
    document.body.removeChild(img);
    document.body.removeChild(text);
    bgAudioEl.pause();

    const pool = new VslibPool();

    let cartridge = defaultCartridge;

    if (location.hash.startsWith('#/')) {
      cartridge = await fetch(
        'https://cloudflare-ipfs.com/ipfs/' + location.hash.slice(2),
      ).then(res => res.json());
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const system = new System(pool, cartridge);
  }
  bgAudioStarted = true;
  // change the text to say press any key to continue
  text.innerText = 'Press any key to continue';
});

// check the mouse down event, if it is down then set bgAudioStarted = true
document.addEventListener('mousedown', () => {
  bgAudioStarted = true;
  // change the text to say press any key to continue
  text.innerText = 'Press any key to continue';
});

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
