const express = require("express");
const app = express();
const session = require('express-session')

const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(cookieParser("secretcode"));

// const user=require("./routes/user");
// const master=require("./routes/master");

app.listen(3000,()=>{
    console.log("Server is start");
})

// app.use("/user",user);
// app.use("/master",master);

// app.get("/getcookie",(req,res)=>{
//     res.send("cookie is displayed");
//     console.log(req.cookies);
// })

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signedcookie is sent");
    
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     console.log(req.cookies);
//     res.send("verified");
    
// })
const sessionOptions={secret:"Mysecretkey",
    resave: false,
    saveUninitialized: true,};

app.use(session(sessionOptions));
app.use(flash());

app.use("/hello",(req,res,next)=>{
     res.locals.successMsg=req.flash("success");
     res.locals.errorMsg=req.flash("error");
    next();
});

app.get("/recount",(req,res)=>{
    if(req.session.count){req.session.count++;
        res.send(`Total count of requests is ${req.session.count}`);
    }
    else {req.session.count=1;
        res.send(`Total count of requests is ${req.session.count}`);
    }
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous")
    req.flash('error', 'User  not registered!')
else
    req.flash('success', 'User registered Successfully!')
    // console.log(req.flash("success"));// flash runs only once so if it run here then not down
  res.redirect('/hello');
})

app.get("/hello",(req,res)=>{
    // const message=req.flash("success");
    // res.render("Server.ejs",{ name:req.session.name, msg: req.flash("success")});or
    res.render("Server.ejs",{name:req.session.name});

})

app.get("/",(req,res)=>{
    res.send("This is root ");
})


