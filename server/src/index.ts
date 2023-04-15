import * as ethers from 'ethers';

import config from "../config.json";

const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const wallet = new ethers.Wallet(config.privateKey, provider);

export default {
  port: 3000,
  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/deploy') {
      const cartridge = await request.json();

      return new Response(
        `todo | ${(await wallet.getBalance()).toString()} | ${JSON.stringify(cartridge).length}`
      );
    }

    return new Response('not found', { status: 404 });
  },
};
