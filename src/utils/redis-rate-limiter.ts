import Redis from 'ioredis';

const redisRateLimiterClient = new Redis({
  password: process.env.REDIS_RATE_LIMITER_PASSWORD,
  host: process.env.REDIS_RATE_LIMITER_HOST,
  username: process.env.REDIS_RATE_LIMITER_USER,
  port: Number(process.env.REDIS_RATE_LIMITER_PORT),
});

async function redisRateLimiterSet(
  key: string,
  value: string,
  expireTime: number,
) {
  return await redisRateLimiterClient.set(key, value, 'EX', expireTime);
}

async function redisRateLimiterGet(key: string) {
  return await redisRateLimiterClient.get(key);
}

export { redisRateLimiterClient, redisRateLimiterSet, redisRateLimiterGet };
