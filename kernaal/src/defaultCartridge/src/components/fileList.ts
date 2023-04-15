import { type Text64Node } from '../types';
import { type Text64Node } from '../Text64Node';
import { renderFooterNav } from './footerNav';

export function renderFileList(title: string, files: { id: string, name: string }[], offset: number): Text64Node {
  const NUM_ELEMENTS = 6;
  const SPACING = 3;

  const shouldRenderUp = offset > 0;
  const shouldRenderDown = offset + NUM_ELEMENTS < files.length;
  const renderedFiles = files.slice(offset, offset + NUM_ELEMENTS);

  let nodes: Text64Node = [
    {
      pos: [10, 10],
      width: 100,
      text: `[${title}]`,
    },
    renderedFiles.map(({ name }, index) => ({
      pos: [10, 16 + index * SPACING],
      width: 100,
      text: name,
    })),
    renderFooterNav(['Esc', '[U]p', '[D]own', 'Enter', '[C]reate', '[D]elete', '[U]pdate']),
    { onKeyDown: ['ArrowUp', { op: 1 }] },
    { onKeyDown: ['ArrowDown', { op: -1 }] },
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
