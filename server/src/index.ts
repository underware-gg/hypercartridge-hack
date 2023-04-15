import { exec } from 'child_process';
import * as fs from 'fs';

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
      const { address, cartridge } = await request.json();

      fs.writeFileSync('cartridge.json', JSON.stringify(cartridge));

      const ipfsRes = JSON.parse(await new Promise((resolve, reject) => {
        exec(
          `curl -X POST -F file=@cartridge.json -u "${config.infura.id}:${config.infura.secret}" "https://ipfs.infura.io:5001/api/v0/add"`,
          (err, stdout, stderr) => {
            if (err) {
              reject(err);
            } else {
              resolve(stdout);
            }
          }
        );
      }));

      const cartridgeUrl = `${config.ideUrl}/#/${ipfsRes.Hash}`;

      console.log("minting");
      await (await hyperCartridge.mint(wallet.address, cartridgeUrl)).wait();
      console.log("minted");
      const tokenId = (await hyperCartridge.totalSupply()).toNumber();

      console.log("transferring");
      await (await hyperCartridge.transferFrom(wallet.address, address, tokenId)).wait();
      console.log("transferred");

      return new Response(JSON.stringify({
        chainId: provider.network.chainId,
        nftAddress: config.hyperCartridgeAddress,
        tokenId,
        state: cartridgeUrl,
      }));
    }

    return new Response('not found', { status: 404 });
  },
};
