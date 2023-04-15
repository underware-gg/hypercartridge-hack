import type { State } from './types';

export default function makeDefaultState(): State {
  return {
    page: 'home',
    selectionIndex: 0,
    maxSelectionIndex: 2,
    column: 0,
    code: [],
    offset: 0,
  };
}
