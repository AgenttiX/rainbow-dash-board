const logger = require('../logger')(__filename);

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  logger.error(err.stack || err);
  logger.debug(JSON.stringify(err));

  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    error: err.message || err,
  });
};
