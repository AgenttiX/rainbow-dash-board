const envConfig = require('../config');

const config = {
  client: 'pg',
  connection: envConfig.DATABASE_URL,
  migrations: {
    tableName: 'migrations',
  },
  pool: {
    min: 1,
    max: 7,
  },
};

let knex = null;

function connect() {
  if (!knex) {
    knex = require('knex')(config);
  }

  return {
    knex,
    config,
  };
}

module.exports = {
  config,
  connect,
};
