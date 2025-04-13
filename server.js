const mongoose = require('mongoose');

const dontenv = require('dotenv');

dontenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

//For local database connection USE .connect(process.env.DATABASE_LOCAL;

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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
