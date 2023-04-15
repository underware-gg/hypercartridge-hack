import type { Text64Node } from '../types';

export function renderCursor(t: number, pos: [number, number]): Text64Node {
  if (Math.floor(t / 500) % 2 === 0) {
    return [];
  }

  return {
    box: {
      pos,
      size: [1, 1],
      color: '#ffffff66',
    },
  };
}
