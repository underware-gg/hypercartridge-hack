import type { Text64Node, State } from '../types.ts';
import { renderFooterNav } from './footerNav';

export function renderDeploy(t: number, state: State): Text64Node { 
  return [
    {
      pos: [10, 10],
      width: 100,
      text: 'Deploy',
    },
    renderFooterNav(['Esc', 'Enter']),
  ];

}
