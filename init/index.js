// This initializes all the db data
const mongoose=require("mongoose");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderplaces";

const initData=require("./data.js");
const listing=require("../models/listings.js")

main()
        .then(()=>{
            console.log('connected to DB');
        })
        .catch((err)=>{
            console.log(err);
        })

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await listing.deleteMany();
    let index=0;
    initData.data=initData.data.map((listing) => ({
        ...listing,
        image: {
          url: listing.image,
          filename: `Listing${++index }`, // Generate a unique filename
        },
        owner: "678d35ca873ebfb4e1b31fc1", 
        category:"mountain"// Add an owner field if required
      }));
    await listing.insertMany(initData.data);
    console.log("Data was initialized");
    console.log(initData.data);
}

initDB();



