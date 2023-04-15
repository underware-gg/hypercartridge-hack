import VslibPool from './vslib/VslibPool.ts';

const pool = new VslibPool();

(async () => {
  const job = pool.run('/main.ts', {
    '/main.ts': `
      export default function main() {
        return 3n ** 5n;
      }
    `,
  });

  console.log(await job.wait());
})();
