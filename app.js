require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { url } = require("inspector");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./midddleware/authentication");
const blog = require("./models/blog");

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDb Connected!")
});

// console.log(process.env.myname);

const app = express();
const PORT = process.env.PORT || 8002;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication("token")) ;

app.get("/", async (req,res) => {
    // console.log("the user is : ",req.user);
    const allBlogs = await blog.find({});
    res.render("home" ,{
        user : req.user,
        blogs: allBlogs,
    });
});

app.use("/user",userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, ()=>{
    console.log(`Server is started on port : ${PORT} .`);
}); 