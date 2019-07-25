const express = require('express');
const app = express();
const winston=require('winston');

require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 5000;
const server=app.listen(port, () => winston.info(`Lestining to port ${port}...`));
module.exports=server;