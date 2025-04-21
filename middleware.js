const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError");
const {listingSchema,reviewschema} =  require("./schema.js");



module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl =  req.originalUrl;
        req.flash("error","You Must Logged In To Crete Listing");
        return res.redirect("/login");
    }
    next();
}



module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req,res,next)=>{
    let {id} =req.params;
    // if(!req.body.Listing){
    //     throw new ExpressError(400,"send valid data for listing");
    // }
    let listing = await Listing.findById(id);
    if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};

module.exports.validListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errmsg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
}

module.exports.validReview = (req,res,next)=>{
    console.log(req.body);
    let {error} = reviewschema.validate(req.body);
    if(error){
        let errmsg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} =req.params;
    // if(!req.body.Listing){
    //     throw new ExpressError(400,"send valid data for listing");
    // }
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};