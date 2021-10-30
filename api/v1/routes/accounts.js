const express = require("express");
const router = express.Router();
const checkAuth = require("../auth/check-auth");

//Import Controller
const AccountController = require("../controllers/accounts");

//signup
router.post("/signup",AccountController.signup);
router.post("/signup/:userId/confirm/",AccountController.confirm); //to be refactored

//login
router.post("/login",AccountController.login);
//reset password
router.post('/reset',AccountController.reset_password);
//delete account
router.delete('/delete',AccountController.delete_account);
//modify Account
router.patch("/edit",AccountController.edit_profile);

//Resend confirmation Code
router.post("/signup/resend",AccountController.resendCode);

//Account Summary
router.get("/",checkAuth ,AccountController.getSummary);


// router.get('/',(req,res)=>{
//     res.status(200).json({message:"Default route"});
// });

module.exports = router;