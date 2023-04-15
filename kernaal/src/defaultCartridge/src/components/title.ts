import type { State, Text64Node } from '../types';
import { renderFooterNav } from './footerNav';

export function renderTitle(state: State): Text64Node {
  const { selectionIndex } = state;

  return [
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
    {
      box: {
        pos: [1, 1],
        size: [1, 1],
        color: 'white',
      },
    },
  ];
};
