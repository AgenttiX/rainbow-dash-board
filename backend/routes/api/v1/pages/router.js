const pageController = require('../../../../controllers/page-controller');

module.exports = function(router) {
  return router.get(
    '/',
    pageController.getPages
  );
};
