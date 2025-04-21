const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {validReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controller/review.js");

//review
router.post("/",isLoggedIn,validReview,wrapAsync(reviewcontroller.createReview));
//delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.deleteReview));


module.exports =router;