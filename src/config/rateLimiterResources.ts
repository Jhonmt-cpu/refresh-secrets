interface RateLimiterResources {
  [key: string]: {
    [key: string]: number;
  };
}

const rateLimiterResources: RateLimiterResources = {
  '/': {
    GET: 4,
  },
  '/login': {
    POST: 3,
  },
  '/refresh': {
    POST: 10,
  },
  '/synchronize-cache': {
    POST: 1,
  },
  '/users': {
    POST: 3,
    GET: 5,
  },
};

export default rateLimiterResources;
