import Redis from 'ioredis';
import { ICacheSet, ITokenCacheProvider } from '../ITokenCacheProvider';

class RedisTokenCacheProvider implements ITokenCacheProvider {
  private redisClient = new Redis({
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USER,
  });

  async set({ key, value, expireTime }: ICacheSet): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expireTime);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async flushAll(): Promise<void> {
    await this.redisClient.flushall();
  }

  async multipleSet(refreshTokens: ICacheSet[]): Promise<void> {
    const pipeline = this.redisClient.pipeline();

    refreshTokens.forEach((refreshToken) => {
      pipeline.set(
        refreshToken.key,
        refreshToken.value,
        'EX',
        refreshToken.expireTime,
      );
    });

    await pipeline.exec();
  }
}

export { RedisTokenCacheProvider };
