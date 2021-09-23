const express = require("express");
const router = express.Router();

//Import controller
const ReviewController = require("../controllers/reviews")



router.get('/', ReviewController.reviews_get_all);

router.get('/:businessId', ReviewController.get_reviews)

router.post('/:businessId', ReviewController.make_review);

router.delete('/:reviewId', ReviewController.delete_review);


module.exports = router;