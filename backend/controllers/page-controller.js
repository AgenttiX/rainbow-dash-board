const logger = require('../logger')(__filename);
const pageService = require('../services/page-service');
const controllerUtils = require('./controller-utils');

async function getPages(req, res) {
  logger.silly('pageController.getPages');

  // Validate input data using Joi (https://github.com/hapijs/joi)

  const pages = await pageService.getPages();

  controllerUtils.sendResult(res, pages);
}

module.exports = {
  getPages,
};
