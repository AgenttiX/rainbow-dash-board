const _ = require('lodash');
const changeCase = require('change-case');

function toCase(data, transformer) {
  if (_.isArray(data)) {
    return _.forEach(data, entry => toCase(entry, transformer));
  }
  
  if (_.isString(data)) {
    return transformer(data);
  }
  
  if (_.isObjectLike(data)) {
    _.mapKeys(data, (value, key) => transformer(key));
  }

  return data;
}

function toCamelCase(data) {
  toCase(data, changeCase.camelCase);
}

function toSnakeCase(data) {
  toCase(data, changeCase.snakeCase);
}

module.exports = {
  toCamelCase,
  toSnakeCase,
};
