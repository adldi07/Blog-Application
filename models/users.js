const { Schema , model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true ,
        unique: true ,
    },
    salt:{
        type: String,
        // required: true,
    },
    password:{
        type: String ,
        required: true,
    },
    profileImageURL:{
        type: String ,
        default: "/images/default.jpeg",
    },
    role:{
        type : String ,
        enum: ["USER", "ADMIN"],
        deafult : "USER",
    },
}, { timestamps : true });

userSchema.pre("save", function (next){
    const user = this ;
    if(!user.isModified("password")){
        return ;
    };

    const salt = randomBytes(16).toString();
    // const salt = "adesh@8061";
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;

    next();

});

userSchema.static("matchPassword", async function (email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User Not Found!");

    // console.log(user);
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if(userProvidedHash !== hashedPassword){
        throw new Error("User not found! Incorrect Password");
    }
    // return {...user , password: undefined , salt: undefined };
    const token = createToken(user);
    return token;
});

const User = model("user",userSchema);

module.exports = User;