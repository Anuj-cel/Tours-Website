const express=require("express");
const router=express.Router();





router.get("/getcookie",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("origin","Imdia");
    res.send("Cookies has been sent to master");
})


router.get("/:id",(req,res)=>{
    res.send("This is master id");
})
router.get("/",(req,res)=>{
    res.send("This is master");
})


router.post("/",(req,res)=>{
    res.send("This is master post");
})



module.exports=router;
