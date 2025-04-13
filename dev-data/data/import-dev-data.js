const fs = require('fs');

const mongoose = require('mongoose');

const dontenv = require('dotenv');

dontenv.config({ path: './config.env' });

const Tour = require('../../models/tourModel');

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

// READ FILES FROM DB
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const importTour = async () => {
  try {
    await Tour.create(tours);
    console.log('Tours successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL FILES FORM DB
const deleteTour = async () => {
  try {
    await Tour.deleteMany();
    console.log('Tours successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importTour();
} else if (process.argv[2] === '--delete') {
  deleteTour();
}
