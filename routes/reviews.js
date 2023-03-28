const express = require('express');
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const reviews = require('../controller/reviews')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router