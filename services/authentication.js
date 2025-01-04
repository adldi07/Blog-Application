const JWT = require("jsonwebtoken");
const secret = "adesh@8061";


function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }

    const token = JWT.sign(payload, secret);

    return token;
}

function validateToken(token){
    const payload = JWT.verify(token , secret );
    // console.log(payload);
    return payload;
}

module.exports = {
    createToken,
    validateToken,
}