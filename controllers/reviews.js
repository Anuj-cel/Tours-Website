
const Listing=require("../models/listings.js");
const Review=require("../models/reviews.js")

module.exports.newReview=async(req,res)=>{
    let listing =await Listing.findById(req.params.id);
    // console.log(req.body);
    let newReview = new Review(req.body);
    newReview.author=res.locals.currentUser._id;
    listing.reviews.push(newReview);
    await newReview.save();
    console.log("New review ",newReview);
    await listing.save();
    req.flash("success","New review added!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview=async (req,res)=>{
    let {id,reviewId}=req.params;
    console.log("I am in delete section of review with id ", id ," and reviewId ", reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
};