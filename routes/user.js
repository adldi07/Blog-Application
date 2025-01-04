const express = require("express");
const User = require("../models/users");
const { createHmac } = require("crypto");

const router = express.Router();

router.get("/signin",(req,res)=>{
    res.render("signin");
});

router.post("/signin", async (req,res)=>{
    const { email , password } = req.body;
    // const user = await User.find({
    //     email,
    // });
    // const salt = user.salt;
    // // const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    // const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
    // if(hashedPassword===user.password){
    //     return res.redirect("/");
    // }
    // console.log(email, password);
    try {
        const token  = await User.matchPassword(email,password);

        // console.log("Token " ,token);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        // console.log("dbfd ");
        return res.render("signin",{
            // error: "Invalid email or password !",
        });
    }
    
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
});

router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.post("/signup", async (req,res)=>{
    const { fullName , email , password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return  res.redirect("/");
});


module.exports = router;
