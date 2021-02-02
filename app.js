const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const AuthorizationRouter = require('./routes/authorization.routes');
const AdminRouter = require('./routes/admin.routes');
const UserRouter = require('./routes/user.routes');
const DefectRouter = require('./routes/defect.routes');
const OrderRouter = require('./routes/order.routes');
const errorHandler = require('./middleware/errors.middleware');
const config = require('./config/keys.config');

const app = express();

const limiter = rateLimit({
    store: new MongoStore({
        uri: config.mongoURI,
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests',
});

app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 10000 }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(compression());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/authorization', AuthorizationRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);
app.use('/api/defect', DefectRouter);
app.use('/api/order', OrderRouter);
app.use(errorHandler);

module.exports = app;
