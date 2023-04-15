import { type Text64Node } from '../types';
import { type Text64Node } from '../Text64Node';
import { renderFooterNav } from './footerNav';

export function renderCodeEditor(filename: string, code: string[], offset: number): Text64Node {
  const NUM_ELEMENTS = 6;
  const SPACING = 3;

  const shouldRenderUp = offset > 0;
  const shouldRenderDown = offset + NUM_ELEMENTS < code.length;
  const renderedCode = code.slice(offset, offset + NUM_ELEMENTS);

  const nodes: Text64Node = [
    {
      pos: [10, 10],
      width: 100,
      text: `[${filename}]`,
    },
    renderedCode.map((line, index) => ({
      pos: [10, 16 + index * SPACING],
      width: 100,
      text: line,
    })),
    renderFooterNav(['Esc']),
  ];

  if (shouldRenderUp) {
    nodes.unshift({
      pos: [10, 13],
      width: 100,
      text: '▲',
    });
  }

  if (shouldRenderDown) {
    nodes.push({
      pos: [10, 16 + NUM_ELEMENTS * SPACING],
      width: 100,
      text: '▼',
    });
  }
    
  return nodes;
};
