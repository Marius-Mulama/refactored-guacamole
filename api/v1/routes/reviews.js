const express = require("express");
const checkAuth = require("../auth/check-auth");
const router = express.Router();

//Authentication checking

//Import controller
const ReviewController = require("../controllers/reviews")



router.get('/',checkAuth, ReviewController.reviews_get_all); //Get all revews made by user

router.get('/:businessId', ReviewController.get_reviews); //Reviews of a business

router.get('/search/', ReviewController.search_business); //Search busness

router.get('/:businessId/myreviews',checkAuth, ReviewController.get_individual_review);

router.post('/:businessId', checkAuth, ReviewController.make_review); //protect route

router.delete('/delete/:reviewId', checkAuth, ReviewController.delete_review); //protect route


module.exports = router;