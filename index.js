const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { url } = require("inspector");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./midddleware/authentication");

mongoose.connect("mongodb://localhost:27017/blogify").then(()=>{
    console.log("MongoDb Connected!")
});

const app = express();
const PORT = 8002;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req,res) => {
    // console.log(req.user);
    res.render("home" ,{
        user : req.user,
    });
});

app.use(express.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication("token")) ;

app.use("/user",userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, ()=>{
    console.log(`Server is started on port : ${PORT} .`);
}); 