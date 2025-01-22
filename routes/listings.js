const express=require('express');
const router = express.Router({ mergeParams: true });
const {isLoogedIn, validateListing,isOwner}=require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {cloudinary,storage}=require("../cloudConfig.js");
const upload = multer({ storage }); // now multer will store the img to clodinary storage
const Listing=require("../models/listings.js")

const Category = Object.freeze({
    MOUNTAIN: "mountain",
    FARM: "farm",
    CASTLE: "castle",
    BEACH: "beach",
  });

//index route
router.route("/")
.get( wrapAsync(listingController.index))

router.route("/category/:cat").get(async(req,res)=>{
    let cat=req.params.cat;
    console.log("This is category ",cat);
    const allListings = await Listing.find({ category: cat});
    res.render("listings/index.ejs", { allListings,Category });
})

    // req.file is the `avatar` file
//new route
router.route("/new")
.get(isLoogedIn,listingController.renderNewForm)// we passed middleware here for authentication for shorter code in /new and /delete , .edit
.post( isLoogedIn,
    upload.single('Listing[image]'),
    validateListing,// first validateListing middleware is called for schema validation by joi
    wrapAsync(listingController.createListing));
// .post( upload.single('Listing[image]'),(req,res)=>{ //Listing[image] is the name of image field
//     res.send(req.file);
// })



//show route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoogedIn,upload.single("Listing[image]"),isOwner,validateListing,wrapAsync(listingController.updateListing))//update route
.delete( isLoogedIn,isOwner,wrapAsync(listingController.deleteListing));//delete route



//edit route
router.get("/:id/edit", isLoogedIn,isOwner,wrapAsync(listingController.renderEditForm));
module.exports=router;


