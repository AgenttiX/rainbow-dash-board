const datasetController = require('../../../../controllers/dataset-controller');
const { wrapController } = require('../../../../controllers/controller-utils');

module.exports = function(router) {
  router.get(
    '/',
    wrapController(datasetController.getDatasets)
  );

  router.get(
    '/:datasetId',
    wrapController(datasetController.getDataset)
  );

  return router;
};
