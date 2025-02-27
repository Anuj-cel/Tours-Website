const ExpressErrors = require("../utils/ExpressErrors.js");
const Listing = require("../models/listings.js");
const {isLoogedIn}=require("../middleware.js");

module.exports.index=async (req, res, next) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm=(req, res) => {
    console.log(isLoogedIn)
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res, next) => {

    let { id } = req.params;
    const extractedList = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        }
    })
    .populate("owner");
    // console.log("This is extractedList ",extractedList);
    if(!extractedList) // if list is absent then flash error
    {
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    else 
    {
        console.log(extractedList);
        res.render("listings/show.ejs", { extractedList });}
};

module.exports.createListing=async (req, res, next) => { 
    console.log("This is request body ",req.body);

    let url=req.file.path;
    let filename=req.file.filename;
    console.log("This is img url ",url, " and filename ",filename);
    let newList = new Listing(req.body.Listing);
    newList.owner=res.locals.currentUser._id;// to add the id of new owner
    newList.image.url=url;
    newList.image.filename=filename;
    console.log("This is newlisting ",newList);

    await newList.save();
    req.flash("success","New listing added!");
    res.redirect("/listings");

};

module.exports.renderEditForm=async (req, res, next) => {
    let { id } = req.params;
    const extractedList = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        }
    })
    .populate("owner");//reviews,owner populated
    console.log("This is extractedList ",extractedList);
    if(!extractedList) // if list is absent then flash error
    {
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl=extractedList.image.url;
        console.log("This is extractedlist from edit renderform ",extractedList);
     res.render("listings/edit.ejs", { originalImageUrl,extractedList});
};


module.exports.updateListing=async (req, res, next) => {
    let { id } = req.params;
    if (!req.body.Listing) {
        throw new ExpressErrors(400, "Bad request");//bad request by the user
    }
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    console.log("This is listing updated ",listing);
    if(typeof (req.file)!="undefined")
  {  let url=req.file.path;
    let filename=req.file.filename;
    console.log("This is img url ",url, " and filename ",filename);
    listing.image.url=url;
    listing.image.filename=filename;

    
}
await listing.save();
    req.flash("success","Listing edited!");// not before edit.ejs redirect
    res.redirect(`/listings/${id}`);
};
module.exports.deleteListing=async (req, res, next) => {
    let { id } = req.params;
    const extractedList = await Listing.findById(id).populate("reviews").populate("owner");
    console.log("this is extracted list form delete ",extractedList);
    if(!res.locals.currentUser._id.equals(extractedList.owner._id))
        {
            req.flash("error","You are not the owner of the listing!");
            res.redirect(`/listings/${id}`);
        }
        else
    {let deletedlisting=await Listing.findByIdAndDelete(id);
    console.log("Deleted listing ",deletedlisting);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");}
};
