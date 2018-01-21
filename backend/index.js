const path = require('path');
const express = require('express');
const fileRouter = require('express-file-router');

var app = express();
 
//Load all files in endpoints 
app.use(fileRouter.load(path.join(__dirname, 'endpoints')));
