
const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next) =>{
    try {

        const token = req.cookies.userToken;
        if(!token){
            return res.redirect("/login")
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId;

        next()


    } catch (error) {
        console.log("Error from authMiddleware",error);
        return res.redirect("/login");
    }
}


module.exports = {authMiddleware};