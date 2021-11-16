const express = require('express');
const router = express.Router();


const BusinessController = require('../controllers/business')


router.post('/register', BusinessController.create_business);
router.get("/", BusinessController.show_all)
router.get('/search?', BusinessController.search_business); //Search busness


//Reply to review
//router.post('/reviews/reply/:reviewId', BusinessController.review_reply);
//change complain status to processing
router.get('/complains/pending/:complainId',BusinessController.to_processing)
//change complain status to closed
router.get('/complains/close/:complainId', BusinessController.close_complain);
//make remarks 
router.get("/complains/remarks/:complainId",BusinessController.make_remarks);
//

module.exports = router;