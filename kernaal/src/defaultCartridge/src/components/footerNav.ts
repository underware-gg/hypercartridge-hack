import type { Text64Node } from '../types.ts';

export function renderFooterNav(hotkeys: string[]): Text64Node {
  let count = 10;
  let components: Text64Node = [];

  for (let i = 0; i < hotkeys.length; ++i) {
    components.push({
      pos: [count, 40],
      width: 100,
      text: hotkeys[i],
    });

    count += hotkeys[i].length + 1;
  }

  return components;
}
