const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');

const factoryHandler = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getallReviews = factoryHandler.getAll(Review);
exports.getReview = factoryHandler.getOne(Review);
exports.CreateReview = factoryHandler.createOne(Review);
exports.deleteReview = factoryHandler.deleteOne(Review);
exports.updateReview = factoryHandler.updateOne(Review);
