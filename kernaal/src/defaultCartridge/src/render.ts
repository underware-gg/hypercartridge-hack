import type { Text64Node } from './Text64Node.ts';

export default function main(t: number, [cx, cy]: [number, number]): Text64Node {
  return [
    {
      pos: [10, 10],
      width: 100,
      text: `HyperCartridge t: ${Math.floor(t/1000)}, cursor: (${cx}, ${cy})`,
    },
  ];
}
