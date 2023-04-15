import type { State, Operation } from './types.ts';

export default function update(state: State, op: Operation): State {
  return state + op;
}
