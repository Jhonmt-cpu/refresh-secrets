import Redis from 'ioredis';

const redisClient = new Redis({
  password: process.env.REDIS_PASSWORD,
});

interface IRedisSet {
  key: string;
  value: string;
  expireTime: number;
}

async function redisSet(key: string, value: string, expireTime: number) {
  return await redisClient.set(key, value, 'EX', expireTime);
}

async function redisGet(key: string) {
  return await redisClient.get(key);
}

async function redisDel(key: string) {
  return await redisClient.del(key);
}

async function redisFlushAll() {
  return await redisClient.flushall();
}

async function redisMultipleSet(refreshTokens: IRedisSet[]) {
  const pipeline = redisClient.pipeline();

  refreshTokens.forEach((refreshToken) => {
    pipeline.set(
      refreshToken.key,
      refreshToken.value,
      'EX',
      refreshToken.expireTime,
    );
  });

  return await pipeline.exec();
}

export {
  redisClient,
  redisSet,
  redisGet,
  redisDel,
  redisFlushAll,
  redisMultipleSet,
};
