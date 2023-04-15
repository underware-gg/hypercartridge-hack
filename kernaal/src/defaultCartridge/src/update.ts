import type { State, Operation } from './types.ts';

export default function update(state: State | null, op: Operation): State {
  if (state === null) {
    state = 0;
  }

  return state + op;
}
