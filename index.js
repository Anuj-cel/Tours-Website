if(process.env.NODE_ENV!="production")
{
    require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const reviewsRouter=require("./routes/reviews.js");
const listingRouter=require("./routes/listings.js");
const userRouter=require("./routes/user.js");
const listingController=require("./controllers/reviews.js");

const User=require("./models/users.js"); // user model
const passport =require("passport"); // for passport 
const LocalStrategy=require('passport-local');// for local passport
const ExpressErrors = require("./utils/ExpressErrors.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('ejs', ejsMate);


const DB_URL=process.env.ATLASDB_URL;

const store= MongoStore.create({ mongoUrl: DB_URL,
    crypto:{
        secret:process.env.SESSION_SECRET ,
        touchAfter:24*3600,
    }
 });

const sessionOptions = {
store:store,//  new session
    secret:  process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: true,
    cookie:(
        { //-->cookie not Cookie
        // expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge:7 * 24 * 60 * 60 * 1000 , //--> not with Date.now()
        httpOnly: true,
    }),
};
store.on("error",()=>{
    console.log("Error in Mongo Session Store",err);
})


main()
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(DB_URL);
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());// serialize in one session
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

app.use('/listings', listingRouter);
app.use('/',userRouter);

app.use('/listings/:id/reviews',reviewsRouter);
                                                                                                                            




app.all("*", (req, res, next) => {
    next(new ExpressErrors(404, "Page Not Found !"));
});



app.use((err, req, res, next) => {
    let { status = 500, message } = err;
    res.status(status).render("listings/error.ejs", { message })
});

const port=8080;
app.listen(port,()=>{
    console.log("Server is start at port " ,port);
})


