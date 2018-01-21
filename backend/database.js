const knex = require('');
const envConfig = require('./config');

const config = {
  client: 'pg',
  connection: envConfig.DATABASE_URL,
  migrations: {
    tableName: 'migrations',
  },
  pool: {
    min: 0,
    max: 7,
  },
};

let client = null;

function connect() {
  if (client) return client;

  client = knex(config);
  return client;
}

module.exports = {
  config,
  connect,
};
