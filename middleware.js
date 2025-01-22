const  {listingSchema}  = require("./schema.js");
const listing = require("./models/listings.js");
const Review = require("./models/reviews.js");
const {reviewSchema}=require("./schema.js");
const ExpressErrors=require("./utils/ExpressErrors.js");
 
 module.exports.isLoogedIn=(req,res,next)=>{
    console.log("This is from isLoogedIN",req.user);// .user will have user after login
    req.session.redirectUrl=req.originalUrl; // from originalUrl we are coming to login 
    if(!req.isAuthenticated()){ 
        req.flash("error","You must be logged in first ");
       return res.redirect("/login");
    }
    next();
}

// need to store to res.locals as passport erases the .session data after user authentication for login
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {res.locals.redirectUrl=req.session.redirectUrl;}
    else res.locals.redirectUrl="/listings"; // because when we first login from home page then req.session.redirectUrl is undefined
    next();
}
module.exports.validateListing = (req, res, next) => { /// a middleware which runs auto when a post request is called as passed 
    const { error } = listingSchema.validate(req.body);
    console.log("This is validateListing ",req.body);
    if (error) {
        // Extract and join error messages
        console.log(error);
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressErrors(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    console.log("This is req body from validate Review ",req.body);
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>
            el.message).join(",");
        throw new ExpressErrors(404,errMsg);
    }
    else{
        next();
    }
};


module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    const extractedList = await listing.findById(id);
    console.log("I am from isOwner ");
    if(!res.locals.currentUser._id.equals(extractedList.owner._id))
        {
            req.flash("error","You are not the owner of the listing!");
           return res.redirect(`/listings/${id}`);
        }
        else
        next();
}
module.exports.isAuthor=async(req,res,next)=>{
    let { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!res.locals.currentUser._id.equals(review.author._id))
        {
            req.flash("error","You are not the author of the review!");
           return res.redirect(`/listings/${id}`);
        }
        else
        next();
}