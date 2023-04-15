import type { State, Text64Node } from '../types';
import { renderCursor } from './cursor';
import { renderFooterNav } from './footerNav';

export function renderTitle(t: number, state: State): Text64Node {
  const { selectionIndex } = state;

  return [
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
};
