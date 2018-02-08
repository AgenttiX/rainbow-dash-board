const path = require('path');
const express = require('express');
const fileRouter = require('express-file-router');
const logger = require('./logger')(__filename);
const requestLoggerMiddleware =
  require('./middlewares/request-logger-middleware');
const errorMiddleware = require('./middlewares/error-middleware');
const config = require('../config');

var app = express();

app.use(requestLoggerMiddleware);
 
//Load all files in endpoints 
app.use(fileRouter.load(path.join(__dirname, 'routes')));

// Attach error handler middleware
app.use(errorMiddleware);

app.listen(config.PORT, function() {
  logger.info('Server listening at port', config.PORT);
});
