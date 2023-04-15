// import isStandardEvent from './isStandardEvent.ts';
import makeDefaultState from './makeDefaultState.ts';
import type { State, Operation, StandardEvent } from './types.ts';

export default function update(
  state: State | null,
  op: Operation | StandardEvent,
): State {
  state ??= makeDefaultState();

  if (state.page === 'editor') {
    if (op.keyDown.length === 1) {
      if (state.code[state.selectionIndex] === undefined) {
        state.code.push('');
      }
      // state.code[state.selectionIndex] += op.keyDown;
      state.code[state.selectionIndex] = state.code[state.selectionIndex].slice(
        0,
        state.column,
      ) + op.keyDown + state.code[state.selectionIndex].slice(state.column);
      state.column += 1;
    } else if (op.keyDown === 'Backspace') {
      // if there's anything before it, delete it.
      // if it's the beginning of a line, move the cursor to the end of the previous line
      // any text on the same line should be moved to the end of the previous line.
      if (state.column > 0) {
        state.code[state.selectionIndex] = state.code[state.selectionIndex].slice(
          0,
          state.column - 1,
        ) + state.code[state.selectionIndex].slice(state.column);
        state.column -= 1;
      } else if (state.selectionIndex > 0) {
        state.column = state.code[state.selectionIndex - 1].length;
        state.code[state.selectionIndex - 1] += state.code[state.selectionIndex];
        state.code.splice(state.selectionIndex, 1);
        state.selectionIndex -= 1;
      }
    } else if (op.keyDown === 'ArrowLeft') {
      if (state.column > 0) {
        state.column -= 1;
      }
    } else if (op.keyDown === 'ArrowRight') {
      if (state.column < state.code[state.selectionIndex].length) {
        state.column += 1;
      }
    } else if (op.keyDown === 'Enter') {
      if (state.code[state.selectionIndex] === undefined) {
        state.code.push('');
      }

      if (state.column === state.code[state.selectionIndex].length) {
        state.code.splice(state.selectionIndex + 1, 0, '');
      } else {
        state.code.splice(
          state.selectionIndex + 1,
          0,
          state.code[state.selectionIndex].slice(state.column),
        );
        state.code[state.selectionIndex] = state.code[state.selectionIndex].slice(
          0,
          state.column,
        );
      }
      state.selectionIndex += 1;
      state.column = 0;
    }
  }

  if (op.keyDown === 'ArrowUp') {
    if (state.selectionIndex > 0) {
      if (state.page === 'editor') {
        // if the state is at the end of the current line, the cursor should then move to the end of the previous line.
        if (state.column === state.code[state.selectionIndex].length) {
          state.column = state.code[state.selectionIndex - 1].length;
        }
      }

      state.selectionIndex -= 1;
    }
  } else if (op.keyDown === 'ArrowDown') {
    if (state.selectionIndex < state.maxSelectionIndex) {
      if (state.page === 'editor') {
        // if the state is at the end of the current line, the cursor should then move to the end of the previous line.
        if (state.column === state.code[state.selectionIndex].length) {
          state.column = state.code[state.selectionIndex + 1].length;
        }
      }

      state.selectionIndex += 1;
    }
  } else if (op.keyDown === 'Enter') {
    if (state.page === 'home') {
      if (state.selectionIndex === 0) {
        state.page = 'editor';
        state.selectionIndex = 0;
        state.maxSelectionIndex = 10;
      } else if (state.selectionIndex === 1) {
        state.page = 'run';
        state.selectionIndex = 0;
        state.maxSelectionIndex = 0;
      } else if (state.selectionIndex === 2) {
        state.page = 'deploy';
        state.selectionIndex = 0;
        state.maxSelectionIndex = 0;
      }
    } /* else if (state.page === 'files') {
      // we need to also specify what file we're editing.
      state.page = 'editor';
    } */
  } else if (op.keyDown === 'Escape') {
    if (state.page === 'editor') {
      state.page = 'home';
      state.selectionIndex = 0;
      state.maxSelectionIndex = 2;
    } else if (state.page === 'run') {
      state.page = 'home';
      state.selectionIndex = 0;
      state.maxSelectionIndex = 2;
    } else if (state.page === 'deploy') {
      state.page = 'home';
      state.selectionIndex = 0;
      state.maxSelectionIndex = 2;
    }
  }

  return state;
}
