import { type Text64Node } from '../types.ts';
import { renderFooterNav } from './footerNav';

export function renderDeploy(time: number, cursorPos: [number, number]): Text64Node { 
  return [
    {
      pos: [10, 10],
      width: 100,
      text: 'Deploy',
    },
    renderFooterNav(['[U]p', '[D]own', 'Enter']),
  ];

}
