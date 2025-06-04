const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

////middleware
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const cookieParser = require('cookie-parser');

// body parser , reading data from  body  into req.body
// limit the size of the request body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//used to render the pug template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//serving static files
app.use(express.static(path.join(__dirname, 'public')));
///////Set security HTTP headers
// This middleware helps to set various HTTP headers to help protect the app from well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Limit requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter); // apply to all requests

//////loging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/////////MOUNTING ROUTERS
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

/// //handling undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}on this server`, 404));
});

//ERROR HANDLING MIDDLEWARE
// THIS IS THE STANDARD WAY OF HANDLING ERRORS IN EXPRESS USING MIDDLEWARE
//THIS PROVIDES A CENTRALIZED ERROR HANDLING MECHANISM

app.use(globalErrorHandler);

module.exports = app;
