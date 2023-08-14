export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  },
  refresh: {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30'
  }
}
