const express = require('express');
const { models } = require('mongoose');
const router = express.Router();


const BusinessController = require('../controllers/business')


router.post('/', BusinessController.create_business);
router.get("/", BusinessController.show_all)

module.exports = router;