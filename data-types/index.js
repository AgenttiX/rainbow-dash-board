const simpleMeasurement = require('./simple-measurement');

module.exports = {
  names: [
    'simpleMeasurement',
  ],

  getType: (type) => ({
    simpleMeasurement,
  }[type]),
};
