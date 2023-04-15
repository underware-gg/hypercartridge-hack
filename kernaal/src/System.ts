import RunInstance from './RunInstance';
import VslibPool from './vslib/VslibPool';

export default class System {
  runInstance: RunInstance;

  constructor(
    public pool: VslibPool,
    cartridge: Record<string, string>,
  ) {
    this.pool = pool;

    this.runInstance = new RunInstance(
      pool,
      cartridge,
      this.loadCartridge.bind(this),
    );
  }

  loadCartridge(cartridge: Record<string, string>) {
    this.runInstance.stop();

    this.runInstance = new RunInstance(
      this.pool,
      cartridge,
      this.loadCartridge.bind(this),
    );
  }
}
