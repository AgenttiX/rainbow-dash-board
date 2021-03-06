const Joi = require('joi');
const logger = require('../logger')(__filename);
const commonSchemas = require('../schemas/common-schemas');
const datasetService = require('../services/dataset-service');
const controllerUtils = require('./controller-utils');
const { datasetSchema } = require('../schemas/dataset-schemas');

const datasetParamSchema = Joi.object().keys({
  datasetId: commonSchemas.incremental.required(),
});

const datasetBodySchema = datasetSchema.optionalKeys(
  'id', 'createdAt', 'updatedAt'
);

async function getDatasets(req, res) {
  logger.silly('datasetController.getDatasets');

  const opts = {};

  const datasets = await datasetService.getDatasets(opts);

  res.status(200).json(datasets);
}

async function getDataset(req, res) {
  logger.silly('datasetController.getDataset');

  const { datasetId } = controllerUtils.validate(
    req.params,
    datasetParamSchema
  );

  const dataset = await datasetService.getDataset(datasetId);

  res.status(200).json(dataset);
}

async function addDataset(req, res) {
  logger.silly('datasetController.addDataset');

  const dataset = controllerUtils.validate(
    req.body,
    datasetBodySchema
  );

  const newDataset = await datasetService.addDataset(dataset);

  res.status(200).json(newDataset);
}

async function updateDataset(req, res) {
  logger.silly('datasetController.updateDataset');

  const { datasetId } = controllerUtils.validate(
    req.params,
    datasetParamSchema
  );

  const dataset = controllerUtils.validate(
    req.body,
    datasetBodySchema
  );

  const updatedDataset = await datasetService.updateDataset(datasetId, dataset);

  res.status(200).json(updatedDataset);
}

async function deleteDataset(req, res) {
  logger.silly('datasetController.deleteDataset');

  const { datasetId } = controllerUtils.validate(
    req.params,
    datasetParamSchema
  );

  await datasetService.deleteDataset(datasetId);

  res.status(200).send();
}

module.exports = {
  getDatasets,
  getDataset,
  addDataset,
  updateDataset,
  deleteDataset,
};
