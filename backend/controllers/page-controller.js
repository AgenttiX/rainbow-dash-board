const pageService = require('../services/page-service');

async function getPages(req, res) {
  // Validate input data using Joi (https://github.com/hapijs/joi)

  // Get data
  const pages = await pageService.getPages();

  // Send response
  res.status(200).json({
    pages,
  });
}

module.exports = {
  getPages,
};
