const express = require('express');

const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controller/review');

router.route('/').post(authenticateUser, createReview).get(getAllReviews);

router
  .route('/:id')
  .get(authenticateUser, getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
