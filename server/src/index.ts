import * as ethers from 'ethers';

import config from "../config.json";
import abi from './abi';

const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const wallet = new ethers.Wallet(config.privateKey, provider);

const hyperCartridge = new ethers.Contract(config.hyperCartridgeAddress, abi, wallet);

export default {
  port: 3000,
  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/deploy') {
      const cartridge = await request.json();

      const res = await hyperCartridge.getState(1);

      return new Response(
        `todo | ${JSON.stringify(res)} | ${(await wallet.getBalance()).toString()} | ${JSON.stringify(cartridge).length}`
      );
    }

    return new Response('not found', { status: 404 });
  },
};
