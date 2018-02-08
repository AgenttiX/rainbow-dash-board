/* eslint-disable no-process-env */

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'info',
  DISABLE_REQUST_LOGGER: process.env.DISABLE_REQUST_LOGGER === 'true',

  DATABASE_URL: process.env.DATABASE_URL,
};
