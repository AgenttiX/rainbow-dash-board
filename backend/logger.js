const path = require('path');
const winston = require('winston');
const _ = require('lodash');
const config = require('./config');

function setLevel(logger, level) {
  _.each(logger.transports, (transport) => {
    transport.level = level; // eslint-disable-line no-param-reassign
  });
}

function createLogger(filePath) {
  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        label: path.basename(filePath),
        timestamp: true,
        colorize:
          config.NODE_ENV === 'development' ||
          config.NODE_ENV === 'test',
      }),
      new winston.transports.File({
        label: path.basename(filePath),
        timestamp: true,
        filename: 'output.log',
      }),
    ],
  });

  const validLevels = ['silly', 'debug', 'info', 'warn', 'error'];

  if (_.includes(validLevels, config.LOGGER_LEVEL)) {
    setLevel(logger, config.LOGGER_LEVEL);
  } else {
    setLevel(logger, 'info');
  }

  return logger;
}

module.exports = createLogger;
