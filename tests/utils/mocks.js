const _ = require('lodash');

let datasetNumber = 0;
let columnNumber = 0;

function generateDataset(opts = {}) {
  _.defaults(opts, {
    columnCount: 2,
  });

  columnNumber += opts.columnCount;

  datasetNumber++;
  return {
    name: `Test dataset ${datasetNumber}`,
    tableName: `Data table ${datasetNumber}`,
    columns: _.range(opts.columnCount).map(
      n => `Column ${n + columnNumber}`
    ),
  };
}

module.exports = {
  generateDataset,
};
