import isStandardEvent from './isStandardEvent.ts';
import type { State, Operation, StandardEvent } from './types.ts';

export default function update(
  state: State | null,
  op: Operation | StandardEvent,
): State {
  state ??= 0;

  if (isStandardEvent(op)) {
    if (op.keyDown === 'x') {
      return 0;
    }

    return state;
  }

  return state + op;
}
