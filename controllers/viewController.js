const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get all tours from the database
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com',
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = (req, res) => {
  res.status(200);
  res
    .set(
      'Content-Security-Policy',
      "default-src 'self'; " +
        "script-src 'self' https://cdn.jsdelivr.net https://api.mapbox.com; " +
        "style-src 'self' https://fonts.googleapis.com https://api.mapbox.com 'unsafe-inline'; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: blob: https://*.tiles.mapbox.com https://api.mapbox.com; " +
        "connect-src 'self' ws://127.0.0.1:* https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com; " +
        "worker-src 'self' blob:; " +
        "object-src 'none';",
    )
    .render('login', {
      title: 'Log into your account',
    });
};
exports.getAccount = (req, res) => {
  res.status(200);
  res
    .set(
      'Content-Security-Policy',
      "default-src 'self'; " +
        "script-src 'self' https://cdn.jsdelivr.net https://api.mapbox.com; " +
        "style-src 'self' https://fonts.googleapis.com https://api.mapbox.com 'unsafe-inline'; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: blob: https://*.tiles.mapbox.com https://api.mapbox.com; " +
        "connect-src 'self' ws://127.0.0.1:* https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com; " +
        "worker-src 'self' blob:; " +
        "object-src 'none';",
    )
    .render('account', {
      title: 'Your Account',
    });
};
exports.updateUserData = catchAsync(async (req, res, next) => {
  const UpdatUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).render('account', {
    title: 'Your Account',
    user: UpdatUser,
  });
});
