// import isStandardEvent from './isStandardEvent.ts';
import makeDefaultState from './makeDefaultState.ts';
import type { State, Operation, StandardEvent } from './types.ts';

export default function update(
  state: State | null,
  op: Operation | StandardEvent,
): State {
  state ??= makeDefaultState();

  if (op.keyDown === 'ArrowUp') {
    if (state.selectionIndex > 0) {
      state.selectionIndex -= 1;
    }
  } else if (op.keyDown === 'ArrowDown') {
    if (state.selectionIndex < 1) {
      state.selectionIndex += 1;
    }
  } else if (op.keyDown === 'Enter') {
    if (state.page === 'home') {
      if (state.selectionIndex === 0) {
        state.page = 'files';
        state.selectionIndex = 0;
      } else if (state.selectionIndex === 1) {
        state.page = 'run';
        state.selectionIndex = 0;
      } else if (state.selectionIndex === 2) {
        state.page = 'deploy';
        state.selectionIndex = 0;
      }
    } /* else if (state.page === 'files') {
      // we need to also specify what file we're editing.
      state.page = 'editor';
    } */
  } else if (op.keyDown === 'Escape') {
    if (state.page === 'files') {
      state.page = 'home';
      state.selectionIndex = 0;
    } else if (state.page === 'run') {
      state.page = 'home';
      state.selectionIndex = 0;
    } else if (state.page === 'deploy') {
      state.page = 'home';
      state.selectionIndex = 0;
    }
  }

  // if (op.keyDown === 'Backspace') {
  //   return state.slice(0, -1);
  // }

  // if (op.keyDown.length === 1) {
  //   state += op.keyDown;
  // }
  // if (op.keyDown === 'Escape') {
    
  // }

  return state;
}
