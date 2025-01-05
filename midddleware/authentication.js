const { validateToken } = require("../services/authentication.js");

function checkForAuthentication(cookieName){
    return (req, res, next)=>{
        // console.log(req.user)
        req.user = null;
        // console.log("abshdhgs",req.cookies);
        const tokenCookieVal = req.cookies[cookieName];
        // console.log(tokenCookieVal);
        if(!tokenCookieVal){
            return next();
        }

        try{
            const userPayload =  validateToken(tokenCookieVal);
            req.user = userPayload;
            // console.log(req.user);
            return next();
        } catch(error){}

        return next();
    }  ;
}

module.exports = {
    checkForAuthentication,
}