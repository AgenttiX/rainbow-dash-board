const Joi = require('joi');
const common = require('./common-schemas');

const datasetSchema = Joi.object().keys({
  id: common.incremental.required(),
  name: Joi.string().required(),
  tableName: Joi.string().required(),
  columns: Joi.array().items(Joi.string()).required(),
  createdAt: common.createdAt,
  updatedAt: common.updatedAt,
});

module.exports = {
  datasetSchema,
};
