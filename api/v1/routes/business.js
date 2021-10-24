const express = require('express');
const { models } = require('mongoose');
const router = express.Router();


const BusinessController = require('../controllers/business')


router.post('/register', BusinessController.create_business);
router.get("/", BusinessController.show_all)
router.get('/search?', BusinessController.search_business); //Search busness


module.exports = router;