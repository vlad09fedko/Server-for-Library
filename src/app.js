const path = require('path');

const express = require('express');

const router = require('./routers');


const app = express();

app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use('/api', router);

module.exports = app;
