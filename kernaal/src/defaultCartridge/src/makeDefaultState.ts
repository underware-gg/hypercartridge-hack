import type { State } from './types';

export default function makeDefaultState(): State {
  return {
    page: 'home',
    selectionIndex: 0,
  };
}