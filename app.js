const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const WelcomeRouter = require('./routes/welcome.routes');
const errorHandler = require('./middleware/errors.middleware');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/welcome', WelcomeRouter);
app.use(errorHandler);

module.exports = app;
