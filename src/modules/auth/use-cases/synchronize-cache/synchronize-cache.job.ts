import { SynchronizeCacheUseCase } from "./synchronize-cache.use-case";

class SynchronizeCacheJob {
  async execute() {
    const synchronizeCacheUseCase = new SynchronizeCacheUseCase();

    await synchronizeCacheUseCase.execute();
  }
}

export { SynchronizeCacheJob };
