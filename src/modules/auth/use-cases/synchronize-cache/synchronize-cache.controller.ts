import { Request, Response } from 'express';
import { SynchronizeCacheUseCase } from './synchronize-cache.use-case';

class SynchronizeCacheController {
  async handle(request: Request, response: Response): Promise<Response> {
    const synchronizeCacheUseCase = new SynchronizeCacheUseCase();

    await synchronizeCacheUseCase.execute();

    return response.status(200).send();
  }
}

export { SynchronizeCacheController };
