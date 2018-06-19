const db = require('../../src/database').connect();
const logger = require('../../src/logger')(__filename);

async function rollbackDatabase() {
  const version = await db.knex.migrate.currentVersion(db.config);
  if (version !== 'none') {
    await db.knex.migrate.rollback(db.config);
    await rollbackDatabase();
  } else {
    logger.info('Database rolled back');
  }
}

async function migrateDatabase() {
  await db.knex.migrate.latest(db.config);
  logger.info('Database migrated');
}

async function resetDatabase() {
  await rollbackDatabase();
  await migrateDatabase();
}

module.exports = {
  ...db,
  rollbackDatabase,
  migrateDatabase,
  resetDatabase,
};
