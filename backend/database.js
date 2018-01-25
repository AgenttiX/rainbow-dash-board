const envConfig = require('./config');

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

let client = null;

function connect() {
  if (client) return client;

  const knex = require('knex')(config);

  client = {
    knex,
  };
  return client;
}

module.exports = {
  config,
  connect,
};
