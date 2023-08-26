export default {
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  refresh: {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30',
  },
};
