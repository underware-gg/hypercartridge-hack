import { initVslib } from './vslib/index.ts';

let vslib: ReturnType<typeof initVslib> | undefined;

async function getVslib() {
  if (vslib === undefined) {
    vslib = initVslib();
  }

  return await vslib;
}

export default {
  port: 3000,
  fetch(request: Request) {
    return new Response('Welcome to Bun!');
  },
};

(async () => {
  const vslib = await getVslib();
  console.log(vslib.run('/main.ts', (path) => {
    if (path === '/main.ts') {
      return `
        export default function main() {
          return 3n ** 5n;
        }
      `;
    }

    throw new Error('not found');
  }));
})();
