const express = require("express");
const checkAuth = require("../auth/check-auth");
const router = express.Router();


//Import Controller
const ComplantsContoller = require("../controllers/complains");


//Get All Complain
router.get('/', checkAuth, ComplantsContoller.complain_get_all);
//Make Complain
router.post('/make/:company',checkAuth, ComplantsContoller.make_complain);

//Get complain by Company
router.get('/company/:company/',checkAuth, ComplantsContoller.complain_by_company);


//Get Complains by theeir status
router.get('/show/status?',checkAuth, ComplantsContoller.complain_get_by_status);

//Get individual Comlain
router.get('/:complainId',checkAuth, ComplantsContoller.complain_get_one);

//
router.get('/close/:complainId',checkAuth,ComplantsContoller.close_complain);


module.exports = router;

