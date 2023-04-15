import VslibPool from './vslib/VslibPool.ts';

const pool = new VslibPool();

const server = Deno.listen({ port: 8080 });
console.log('ValueScript server running');
console.log();
console.log('Example usage:');
console.log();
console.log('  curl -X POST -d \'return 1 + 1;\' http://localhost:8080');
console.log('  -> {"Ok":"2"}');
console.log();
console.log('  curl -X POST -d \'while (true) {} return 1 + 1;\' http://localhost:8080');
console.log('  -> {"Err":"Error{\\"message\\":\\"step limit reached\\"}"}');

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    requestEvent.request.text().then(async text => {
      const job = pool.run('/main.ts', {
        '/main.ts': `
          export default function main() {
            ${text}
          }
        `,
      });

      const result = await job.wait();

      requestEvent.respondWith(new Response(JSON.stringify(result.output), {
        status: 200,
      }));
    });
  }
}
