const mongoose = require('mongoose');

const dontenv = require('dotenv');
// const Tour = require('./models/tourModel');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION.. SHUTTING DOWN SERVER');
  console.log(err.name, err.message);
  process.exit(1);
});

dontenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('DB connection successfull');

    //USED  FOR FORCE SYNCHRONOUSLY TO SYNC THE INDEXES
    // await Tour.syncIndexes();
    // console.log('Tour indexes synced');
  });

//For local database connection USE .connect(process.env.DATABASE_LOCAL;

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log('UNCAUGHT REJECTION SHUTTING DOWN SERVER');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(app.get('env'));
// console.log(process.env);
//DATABASE_LOCAL=mongodb://localhost:27017/natours local database connection string;

// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.8,
//   price: 399,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error', err);
//   });
