const Joi = require('joi');
const logger = require('../logger')(__filename);
const commonSchemas = require('../schemas/common-schemas');
const datasetService = require('../services/dataset-service');
const controllerUtils = require('./controller-utils');

async function getDatasets(req, res) {
  logger.silly('datasetController.getDatasets');

  // TODO: Validate input

  const opts = {};

  const datasets = await datasetService.getDatasets(opts);

  controllerUtils.sendResult(res, datasets);
}

const getDatasetParamSchema = Joi.object().keys({
  datasetId: commonSchemas.incremental.required(),
});

async function getDataset(req, res) {
  logger.silly('datasetController.getDataset');

  const { datasetId } = controllerUtils.validate(
    req.params,
    getDatasetParamSchema
  );

  // Get data
  const dataset = await datasetService.getDataset(datasetId);

  controllerUtils.sendResult(res, dataset);
}

module.exports = {
  getDatasets,
  getDataset,
};
