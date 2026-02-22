const {HttpStatus} = require("../../helpers/status-code");
const User = require("../../models/userSchema");

const getAdnimLogin = (req,res)=>{
    try {

    res.render("adminLogin");

        
    } catch (error) {
        console.log("Error from getAdminLogin",error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success :false,
            message :"Internal server error"
        })
    }
}

const postAdminLogin = async(req,res)=>{
    try {

        const { email , password } = req.body;

        const admin = await User.findOne({email,isAdmin:true});

        if(!admin){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success : false,
                message : 'Admin is not found or not authorized'
            })
        }

        if(admin.isBlocked){
            return res.status(HttpStatus.FORBIDDEN).json({
                success : false,
                message : "This admin account has been blocked"
            })
        }

        
    } catch (error) {
        console.log("Error from postAdminLogin",error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal server error"
        })
    }
}


module.exports = {
    getAdnimLogin,
}