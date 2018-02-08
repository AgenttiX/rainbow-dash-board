const Joi = require('joi');

const incremental = Joi.number().integer().min(0);
const createdAt = Joi.date();
const updatedAt = Joi.date();

module.exports = {
  incremental,
  createdAt,
  updatedAt,
};
