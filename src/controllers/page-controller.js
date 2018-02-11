const logger = require('../logger')(__filename);
const pageService = require('../services/page-service');

async function getPages(req, res) {
  logger.silly('pageController.getPages');

  // Validate input data using Joi (https://github.com/hapijs/joi)

  const pages = await pageService.getPages();

  res.status(200).json(pages);
}

module.exports = {
  getPages,
};
