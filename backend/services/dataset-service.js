const _ = require('lodash');
const db = require('../database').connect();
const serviceUtils = require('./service-utils');

async function getDatasets(opts) {
  _.defaults(opts, {
    offset: 0,
    limit: 100,
  });

  const rows = await db.knex('dataset')
    .select()
    .limit(opts.limit)
    .offset(opts.offset);

  return serviceUtils.toCamelCase(rows);
}

async function getDataset(datasetId) {
  const rows = await db.knex('dataset')
    .select()
    .where('id', datasetId)
    .limit(1);
  
  if (rows.length === 0) {
    const error = new Error(`Dataset ${datasetId} not found!`);
    error.status = 404;
    throw error;
  }

  return serviceUtils.toCamelCase(rows[0]);
}

module.exports = {
  getDatasets,
  getDataset,
};
