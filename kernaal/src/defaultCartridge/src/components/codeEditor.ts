import type { Text64Node, State } from '../types';
import { renderFooterNav } from './footerNav';
import { renderCursor } from './cursor';

export function renderCodeEditor(t: number, state: State, offset: number): Text64Node {
  const { code, selectionIndex, column } = state;
  const NUM_ELEMENTS = 17;
  const SPACING = 2;

  const shouldRenderUp = offset > 0;
  const shouldRenderDown = offset + NUM_ELEMENTS < code.length;
  const renderedCode = code.slice(offset, offset + NUM_ELEMENTS);

  let nodes: Text64Node[] = [
    {
      box: {
        pos: [4, 4],
        size: [68, NUM_ELEMENTS * 2],
        color: '#636bff',
      },
    },

    // {
    //   pos: [10, 10],
    //   width: 100,
    //   text: `[${filename}]`,
    // },
    renderedCode.map((line, index) => ({
      pos: [5, 5 + index * SPACING],
      width: 100,
      text: line,
    })),
    renderFooterNav(['Esc']),
    renderCursor(t, [5 + column, 5 + selectionIndex * SPACING]),
  ];

  if (shouldRenderUp) {
    nodes.push({
      pos: [10, 3],
      width: 100,
      text: '▲',
    });
  }

  if (shouldRenderDown) {
    nodes.push({
      pos: [10, 5 + NUM_ELEMENTS * SPACING],
      width: 100,
      text: '▼',
    });
  }
    
  return nodes;
};
