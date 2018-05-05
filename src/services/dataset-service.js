const _ = require('lodash');
const db = require('../database').connect();
const serviceUtils = require('./service-utils');

const throwNotFound = (datasetId) => {
  const error = new Error(`Dataset ${datasetId} not found!`);
  error.status = 404;
  throw error;
};

async function getDatasets(opts) {
  _.defaults(opts, {
    offset: 0,
    limit: 100,
  });

  const rows = await db.knex('datasets')
    .select()
    .limit(opts.limit)
    .offset(opts.offset);

  return serviceUtils.toCamelCase(rows);
}

async function getDataset(datasetId) {
  const rows = await db.knex('datasets')
    .select()
    .where('id', datasetId)
    .limit(1);

  if (rows.length === 0) {
    throwNotFound(datasetId);
  }

  return serviceUtils.toCamelCase(rows[0]);
}

async function addDataset(dataset) {
  const dbDataset = serviceUtils.toSnakeCase(dataset);

  delete dbDataset.id; // Id will be decided by the database

  const rows = await db.knex('datasets')
    .insert(dbDataset)
    .returning('*');

  return serviceUtils.toCamelCase(rows[0]);
}

async function updateDataset(id, dataset) {
  const dbDataset = serviceUtils.toSnakeCase(dataset);

  const rows = await db.knex('datasets')
    .where('id', id)
    .update(serviceUtils.setUpdateTimestamps(db, dbDataset))
    .returning('*');

  return serviceUtils.toCamelCase(rows[0]);
}

async function deleteDataset(datasetId) {
  const result = await db.knex('datasets')
    .where('id', datasetId)
    .del();

  if (result === 0) {
    throwNotFound(datasetId);
  }
}

module.exports = {
  getDatasets,
  getDataset,
  addDataset,
  updateDataset,
  deleteDataset,
};
