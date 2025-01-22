const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("This is user");
    
})

router.get("/getcookie",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("origin","Imdia");
    res.send("Cookies has been sent to user");
})

router.get("/:id",(req,res)=>{
    res.send("This is user id");
})

router.post("/",(req,res)=>{
    res.send("This is user post");
})



module.exports=router;