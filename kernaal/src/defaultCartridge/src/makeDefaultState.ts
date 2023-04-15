import type { State } from './types';

export default function makeDefaultState(): State {
  return {
    page: 'home',
    selectionIndex: 0,
    maxSelectionIndex: 2,
    column: 0,
    code: [
      'export default function() {',
      '  return [',
      '    {',
      '      pos: [10, 10],',
      '      width: 100,',
      '      text: \'Hello World\',',
      '    },',
      '  ];',
      '}',
    ],
    offset: 0,
  };
}
