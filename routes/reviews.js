const express=require('express');
const router = express.Router({ mergeParams: true });
const {isLoogedIn,isAuthor,validateReview}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js");


// post review
router.post("/",isLoogedIn,validateReview,wrapAsync(reviewController.newReview));
// /listings/<%= extractedList._id%>/reviews/<%=review._id%>?_method=DELETE
router.delete(
    "/:reviewId",isLoogedIn,isAuthor,
    wrapAsync(reviewController.deleteReview));
module.exports =router; 