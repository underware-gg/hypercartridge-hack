import assert from '../helpers/assert.ts';

const entries = Object.entries(
  import.meta.glob(
    './src/**/*.*',
    { as: 'raw' },
  ),
);

const defaultCartridge: Record<string, string> = Object.fromEntries(await Promise.all(
  entries.map(async ([path, module]) => {
    const prefix = './src';
    assert(path.startsWith(prefix));
    return [path.slice('./src'.length), (await module()).trim()];
  }),
));

export default defaultCartridge;
