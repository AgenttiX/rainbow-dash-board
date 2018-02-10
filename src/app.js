const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger')(__filename);
const config = require('../config');
const requestLoggerMiddleware =
  require('./middlewares/request-logger-middleware');
const errorMiddleware = require('./middlewares/error-middleware');
const routes = require('./routes');

class App {
  constructor() {
    this.expressApp = express();
    this.instance = null;
  }

  async startAsync() {
    this.expressApp.use(requestLoggerMiddleware);

    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));

    // Load all files in endpoints
    await routes.attachRoutes(this.expressApp);

    // Attach error handler middleware
    this.expressApp.use(errorMiddleware);

    return new Promise(resolve => {
      this.instance = this.expressApp.listen(config.PORT, () => {
        logger.info('Server listening at port', config.PORT);
        resolve();
      });
    });
  }

  close() {
    this.instance.close();
  }
}

module.exports = App;
