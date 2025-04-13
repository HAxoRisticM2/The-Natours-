const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name should must have less or equal to 40 charaters ',
      ],
      minlength: [
        10,
        'A tour name should must have greater or equal to 10 charaters ',
      ],
    },
    slug: String,

    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have difficluty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: "easy","medium","difficult",',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.3,
      max: [5, 'rating must be below or equal to 5.0'],
      min: [1, 'rating must be above or equal to 1.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        //this Only points to current document on NEW document creation i.e it
        //will not work with updation of the old docs
        validator: function (val) {
          return val < this.price;
        },
        message: 'the Discount Price({VALUE}) can be greater than actual price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      selected: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: run only before save() and create() {these are moongose middleware}

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  //this is the expresssion that selects all the expression that starts with find string
  //tourSchema.pre('find', function (next) {  this is the normal find method
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.post(/'^find'/, (doc, next) => {
  console.log(doc);
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
