if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}





const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRouter = require("./routes/listing.js");
const reviewRouter =require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localstratergy = require("passport-local");
const User = require("./models/user.js");
const searchRouter = require("./routes/serach.js");


const dbUrl = process.env.ATLAS_DB


main()
.then(()=>{
    console.log("connected db");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const store =  MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});



const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student"
//     });
//    let registerUser = await User.register(fakeUser,"hellowrold");
//    res.send(registerUser);
// })

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use("/searching",searchRouter);




app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});




//error handling
app.use((err,req,res,next)=>{
    const{statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
   // res.status(statusCode).send(message);
});










// app.get("/listing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"By The Beach",
//         price:1200,
//         location:"Hyderabad",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })


app.listen(8080,()=>{
    console.log("server is listening");
});