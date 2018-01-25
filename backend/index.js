const path = require('path');
const express = require('express');
const fileRouter = require('express-file-router');
const logger = require('./logger')(__filename);
const errorMiddleware = require('./middlewares/error-middleware');
const config = require('./config');

var app = express();
 
//Load all files in endpoints 
app.use(fileRouter.load(path.join(__dirname, 'routes')));

// Attach error handler middleware
app.use(errorMiddleware);

app.listen(config.PORT, function() {
  logger.info('Server listening at port', config.PORT);
});
