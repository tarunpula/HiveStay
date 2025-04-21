const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listings = require("../routes/listing.js");
const path = require("path");
const Listing = require("../models/listing.js");
const{isLoggedIn, isOwner,validListing,listingSchema} = require("../middleware.js");
const listingcontroller  = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage});




router
.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isLoggedIn,upload.single("listing[image]"),validListing,wrapAsync(listingcontroller.createListing));

 //new route
router.get("/new",isLoggedIn,listingcontroller.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validListing,wrapAsync(listingcontroller.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingcontroller.deleteListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontroller.editListing));

// //index route
// router.get("/",wrapAsync(listingcontroller.index));
//  //show route
// router.get("/:id",wrapAsync(listingcontroller.showListing));
//  //crete route
// router.post("/",isLoggedIn,validListing,wrapAsync(listingcontroller.createListing));

// //update route
// router.put("/:id",validListing,isLoggedIn,isOwner,wrapAsync(listingcontroller.updateListing));
// //delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingcontroller.deleteListing));




module.exports =router;