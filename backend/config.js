/* eslint-disable no-process-env */

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'info',

  DATABASE_URL: process.env.DATABASE_URL,
};
