const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js"); // Proper model import



router.get("/", async (req, res,next) => {
  try {
    const city = req.query.city;
    console.log(city);
    if (!city)throw new ExpressError(400,"City is required!");


    const foundListings = await Listing.find({
      location: { $regex: city, $options: "i" }
    });

    res.render("listings/searchResults", { 
      listings: foundListings,
      city 
    });
  } catch (e) {
    req.flash("error",e.message);
    res.redirect("/listings"); 
  }
});

module.exports = router;