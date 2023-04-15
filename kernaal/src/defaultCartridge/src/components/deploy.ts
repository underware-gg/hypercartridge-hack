import { type Text64Node } from '../types.ts';
import { renderFooterNav } from './footerNav';

export function renderDeploy(time: number, cursorPos: [number, number]): Text64Node { 
  return [
    {
      pos: [10, 10],
      width: 100,
      text: 'Deploy',
    },
    {
      pos: [10, 15],
      width: 100,
      text: 'Cartridge Name',
    },

    renderFooterNav(['Esc', 'Enter']),
  ];

}
