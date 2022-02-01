const jwt = require("jsonwebtoken");

const checkSignIn = (req,res,next)=>{
    try {
        const {authorization} = req.headers;
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.username= decode.username;
        req.password= decode.password;
        next();
    } catch (err){
      //  console.log(err);
        next("authorization failed");
    }
}
module.exports={
    checkSignIn,
}
