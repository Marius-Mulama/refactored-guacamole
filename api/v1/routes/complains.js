const express = require("express");
const checkAuth = require("../auth/check-auth");
const router = express.Router();


//Import Controller
const ComplantsContoller = require("../controllers/complains");


//Get All Complain
router.get('/', checkAuth, ComplantsContoller.complain_get_all);
//Make Complain
router.post('/make/:company',checkAuth,ComplantsContoller.make_complain);

//Reply to Complain


//Get Complains by theeir status
router.get('/status?',checkAuth,ComplantsContoller.complain_get_by_status);

//Get individual Comlain
router.get('/:complainId',checkAuth,ComplantsContoller.complain_get_one);

//


module.exports = router;

