const express = require('express');

const app = express();

const morgan = require('morgan');

////middleware
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//////loging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'aslam u alikum from the server', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

////// /////////////////////OLDER VERSION OF ROUTING//////////////////////////////////

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', AddTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

/////////MOUNTING ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/// //handling undefined routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}on this server`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl}on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';

  next(new AppError(`Can't find ${req.originalUrl}on this server`, 404));
});

//ERROR HANDLING MIDDLEWARE
// THIS IS THE STANDARD WAY OF HANDLING ERRORS IN EXPRESS USING MIDDLEWARE
//THIS PROVIDES A CENTRALIZED ERROR HANDLING MECHANISM

app.use(globalErrorHandler);

module.exports = app;
