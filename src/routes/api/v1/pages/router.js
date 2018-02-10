const pageController = require('../../../../controllers/page-controller');
const { wrapController } = require('../../../../controllers/controller-utils');

module.exports = function buildRouter(router) {
  router.get(
    '/',
    wrapController(pageController.getPages)
  );

  return router;
};
