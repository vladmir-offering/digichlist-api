const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
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
const limitUtil = require('./utils/limiter.utils');

const app = express();

app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(xss());
app.use(mongoSanitize());
app.use(limitUtil.limiter);
app.disable('x-powered-by');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/authorization', AuthorizationRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);
app.use('/api/defect', DefectRouter);
app.use('/api/order', OrderRouter);

app.use(errorHandler);

module.exports = app;
