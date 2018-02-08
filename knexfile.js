const envConfig = require('./config');
const dbConfig = require('./src/database').config;
const logger = require('./src/logger')(__filename);

const knexConfig = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};

const env = envConfig.NODE_ENV;

if (!Object.prototype.hasOwnProperty.call(knexConfig, env)) {
  logger.error('Invalid NODE_ENV value', env);
}

module.exports = knexConfig;
