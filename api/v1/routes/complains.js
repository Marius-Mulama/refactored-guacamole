const express = require("express");
const checkAuth = require("../auth/check-auth");
const router = express.Router();


//Import Controller
const ComplantsContoller = require("../controllers/complains");

router.get('/',ComplantsContoller.complain_get_all);


module.exports = router;

