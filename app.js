const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const WelcomeRouter = require('./routes/welcome.routes');
const AuthorizationRouter = require('./routes/authorization.routes');
const errorHandler = require('./middleware/errors.middleware');

const app = express();

app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/welcome', WelcomeRouter);
app.use('/api/authorization', AuthorizationRouter);
app.use(errorHandler);

module.exports = app;
