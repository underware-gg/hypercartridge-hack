import type { StandardEvent } from './types';

export default function isStandardEvent(
  op: unknown,
): op is StandardEvent {
  // Workaround for not having the `in` operator
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (op as any).keyDown !== undefined;
}
