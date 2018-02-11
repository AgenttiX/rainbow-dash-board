const Joi = require('joi');

// This makes it possible to catch errors from asynchronous controllers. See
// eslint-disable-next-line max-len
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let wrapController = fn => (...args) => fn(...args).catch(args[2]);

function validate(data, schema) {
  if (!data) {
    const error = new Error('Missing request parameters!');
    error.status = 400;
    throw error;
  }

  const result = Joi.validate(data, schema);

  if (result.error) {
    result.error.status = 400;
    throw result.error;
  }

  return result.value;
}

module.exports = {
  wrapController,
  validate,
};
