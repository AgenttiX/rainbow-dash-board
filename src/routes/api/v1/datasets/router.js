const datasetController = require('../../../../controllers/dataset-controller');
const { wrapController } = require('../../../../controllers/controller-utils');

module.exports = function buildRouter(router) {
  router.get(
    '/',
    wrapController(datasetController.getDatasets)
  );

  router.get(
    '/:datasetId',
    wrapController(datasetController.getDataset)
  );

  router.post(
    '/',
    wrapController(datasetController.addDataset)
  );

  router.patch(
    '/:datasetId',
    wrapController(datasetController.updateDataset)
  );

  router.delete(
    '/:datasetId',
    wrapController(datasetController.deleteDataset)
  );

  return router;
};
