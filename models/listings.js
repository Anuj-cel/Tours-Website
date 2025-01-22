const { ref, string } = require("joi");
const mongoose=require("mongoose");
const { title } = require("process");
const Schema=mongoose.Schema;



// url:String,
// filename:String
const listingSchema=new Schema({
    title:String,
    description:String,
    image:{
url:String,
filename:String
    },
    price:{type:Number,
        required:true
    },
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",// as a owner should be a user too
    },
    category: {
        type:String,
        default:"mountain"}
});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;