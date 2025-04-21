const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport =  require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller =  require("../controller/user.js");


router
.route("/signup")
.get(usercontroller.renderSignupForm)
.post(wrapAsync(usercontroller.signup));

router
.route("/login")
.get((req,res)=>{
    res.render("users/login.ejs");
})
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usercontroller.renderLoginForm);



router.get("/logout",usercontroller.logout);


module.exports = router;