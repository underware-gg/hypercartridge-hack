// import isStandardEvent from './isStandardEvent.ts';
import type { State, Operation, StandardEvent } from './types.ts';

export default function update(
  state: State | null,
  op: Operation | StandardEvent,
): State {
  state ??= '';

  if (op.keyDown === 'Backspace') {
    return state.slice(0, -1);
  }

  if (op.keyDown.length === 1) {
    state += op.keyDown;
  }

  return state;
}
