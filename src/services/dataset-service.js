const _ = require('lodash');
const { knex } = require('../database').connect();
const serviceUtils = require('./service-utils');
const dataTypes = require('../../data-types');

const throwNotFound = (datasetId) => {
  const error = new Error(`Dataset ${datasetId} not found!`);
  error.status = 404;
  throw error;
};

function mapDataset(row) {
  delete row.table_id;
  return serviceUtils.toCamelCase(row);
}

async function getDatasets(opts) {
  _.defaults(opts, {
    offset: 0,
    limit: 100,
  });

  const rows = await knex('datasets')
    .select()
    .limit(opts.limit)
    .offset(opts.offset);

  return rows.map(mapDataset);
}

async function getDataset(datasetId) {
  const rows = await knex('datasets')
    .select()
    .where('id', datasetId)
    .limit(1);

  if (rows.length === 0) {
    throwNotFound(datasetId);
  }

  return mapDataset(rows[0]);
}

async function addDataset(dataset) {
  const dbDataset = serviceUtils.toSnakeCase(dataset);

  delete dbDataset.id; // Id will be decided by the database

  let rows;
  await knex.transaction(async (trx) => {
    const dataType = dataTypes.getType(dbDataset.type);

    // Create a new table for the measurement results with the
    // help of a serial.
    const serialResult = await trx.raw("SELECT nextval('ds_serial')");
    const index = serialResult.rows[0].nextval;
    await dataType.create(trx, `ds_${index}`);

    dbDataset.table_id = index;

    rows = await trx('datasets')
      .insert(dbDataset)
      .returning('*');
  });

  return mapDataset(rows[0]);
}

async function updateDataset(id, dataset) {
  const dbDataset = serviceUtils.toSnakeCase(dataset);

  const rows = await knex('datasets')
    .where('id', id)
    .update(serviceUtils.setUpdateTimestamps(knex, dbDataset))
    .returning('*');

  return mapDataset(rows[0]);
}

async function deleteDataset(datasetId) {
  const [dataset] = await knex('datasets')
    .select()
    .where('id', datasetId)
    .limit(1);

  if (!dataset) {
    throwNotFound(datasetId);
  }

  await knex.transaction(async (trx) => {
    await trx('datasets')
      .where('id', datasetId)
      .del();

    const dataType = dataTypes.getType(dataset.type);
    await dataType.destroy(trx, `ds_${dataset.table_id}`);
  });
}

module.exports = {
  getDatasets,
  getDataset,
  addDataset,
  updateDataset,
  deleteDataset,
};
