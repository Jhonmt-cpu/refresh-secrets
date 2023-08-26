import dayjs from 'dayjs';
import {
  redisFlushAll,
  redisMultipleSet,
} from '../../../../shared/config/redis';
import { RefreshTokensRepository } from '../../typeorm/repositories/refresh-tokens-repository';

class SynchronizeCacheUseCase {
  async execute() {
    const refreshTokenRepository = new RefreshTokensRepository();

    await refreshTokenRepository.deleteExpiredTokens();

    const refreshTokens = await refreshTokenRepository.findLastUserTokens();

    const refreshTokensToCache = refreshTokens.map((refreshToken) => {
      return {
        key: refreshToken.refresh_token,
        value: refreshToken.user_id.toString(),
        expireTime: dayjs(refreshTokens[0].expires_in).diff(dayjs(), 'second'),
      };
    });

    await redisFlushAll();

    await redisMultipleSet(refreshTokensToCache);
  }
}

export { SynchronizeCacheUseCase };
