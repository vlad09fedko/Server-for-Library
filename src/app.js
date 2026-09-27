const path = require('path');

const express = require('express');

const router = require('./routers');
const {
  errorHandlers: { validationErrorHandler, errorHandler },
} = require('./middleware');

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(validationErrorHandler, errorHandler);

module.exports = app;
 