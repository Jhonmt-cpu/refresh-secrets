import dayjs from 'dayjs';

import { inject, injectable } from 'tsyringe';
import { IRefreshTokensRepository } from '../../repositories/IRefreshTokensRepository';
import { ITokenCacheProvider } from '../../../../shared/container/providers/TokenCacheProvider/ITokenCacheProvider';

@injectable()
class SynchronizeCacheUseCase {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('TokenCacheProvider')
    private tokenCacheProvider: ITokenCacheProvider,
  ) {}

  async execute() {
    await this.refreshTokensRepository.deleteExpiredTokens();

    const refreshTokens =
      await this.refreshTokensRepository.findLastUserTokens();

    const refreshTokensToCache = refreshTokens.map((refreshToken) => {
      return {
        key: refreshToken.refresh_token,
        value: refreshToken.user_id.toString(),
        expireTime: dayjs(refreshTokens[0].expires_in).diff(dayjs(), 'second'),
      };
    });

    await this.tokenCacheProvider.flushAll();

    await this.tokenCacheProvider.multipleSet(refreshTokensToCache);
  }
}

export { SynchronizeCacheUseCase };
