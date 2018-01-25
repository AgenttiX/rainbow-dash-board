const envConfig = require('./backend/config');
const dbConfig = require('./backend/database').config;

const knexConfig = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};

const env = envConfig.NODE_ENV;

if (!Object.prototype.hasOwnProperty(knexConfig, env)) {
  console.error('Invalid NODE_ENV value', env);
}

module.exports = knexConfig;
