const express = require('express');
const app = express();
const winston=require('winston');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 5000;
const server=app.listen(port, () => winston.info(`Lestining to port ${port}...`));
module.exports=server;