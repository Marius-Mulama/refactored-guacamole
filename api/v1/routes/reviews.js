const express = require("express");
const checkAuth = require("../auth/check-auth");
const router = express.Router();

//Authentication checking

//Import controller
const ReviewController = require("../controllers/reviews")



router.get('/',checkAuth, ReviewController.reviews_get_all);

router.get('/:businessId', ReviewController.get_reviews); 

router.post('/:businessId', ReviewController.make_review); //protect route

router.delete('/:reviewId', ReviewController.delete_review); //protect route


module.exports = router;