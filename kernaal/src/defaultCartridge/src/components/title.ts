import type { State, Text64Node } from '../types';
import { renderCursor } from './cursor';
import { renderFooterNav } from './footerNav';

export function renderTitle(t: number, state: State): Text64Node {
  const { selectionIndex } = state;

  let nodes: Text64Node[] = [
    {
      pos: [64, 40],
      width: 100,
      text: 'v0.0.1',
    },
    {
      pos: [10, 10],
      width: 100,
      text: 'HyperCartridge',
    },
    {
      pos: [10, 15],
      width: 100,
      text: 'Edit',
    },
    {
      pos: [10, 20],
      width: 100,
      text: 'Run',
    },
    {
      pos: [10, 25],
      width: 100,
      text: 'Deploy',
    },
    renderFooterNav(['[U]p', '[D]own', 'Enter']),
    renderCursor(t, [8, 15 + selectionIndex * 5]),
  ];

  if (state.selectionIndex === 1) { // Run
    nodes.push({
      onKeyDown: ['Enter', {
        loadCartridge: makeTestCartridge(),
      }],
    });
  }

  return nodes;
};

function makeTestCartridge() {
  return {
    '/update.ts': `
      export default function() {
        return null;
      }
    `,

    '/render.ts': `
      export default function() {
        return [
          {
            pos: [10, 10],
            width: 100,
            text: 'Hello World',
          },
        ];
      }
    `,
  };
}
