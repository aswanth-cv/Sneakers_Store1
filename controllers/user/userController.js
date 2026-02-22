const {HttpStatus} = require("../../helpers/status-code");
const bcrypt = require("bcrypt");
const User = require("../../models/userSchema");
const { validationResult } = require("express-validator");
const { render } = require("ejs");

const loadHomepage = async(req,res) =>{
    try {
        return res.render("home");

    } catch (error) {
        
        console.log("Home page is not Found..");
        res.status(500).send("Intrnal server Error");

    }
}


const getSignup = (req,res)=>{
    try {

        return res.render("signup",{
            errors : {},
            oldData :{}
        });
        
    } catch (error) {
        console.log("Error from getSignup",error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Internal server error"
        })
    }
}


const postSignup = async(req,res)=>{
    try {

        
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errorObj = {};

      result.array().forEach(err => {
        errorObj[err.path] = err.msg;
      });

      return res.render("signup", {
        errors: errorObj,
        oldData: req.body
      });
    }

        const { name , email , phone , password } = req.body;

        const trimmedName = name.trim()
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPhone = phone.trim()

        const existingUser = await User.findOne({email:trimmedEmail})

        if(existingUser){
            return res.status(HttpStatus.CONFLICT).render("signup",{
                errors : {email : "Email is already registered"},
                oldData : req.body
            })
        }

        const phoneExists = await User.findOne({phone:trimmedPhone});

        if(phoneExists){
            return res.status(HttpStatus.CONFLICT).render("signup",{
                errors : {phone : "Phone is alreay registered"},
                oldData : req.body
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name : trimmedName,
            email :trimmedEmail,
            phone : trimmedPhone,
            password : hashedPassword
        })

        await newUser.save()

        return res.status(HttpStatus.CREATED).render("login",{
            errors :{general:"Account created successfully. Please login"} ,
            oldData : req.body
        })

        
    } catch (error) {
        console.log("Error from postSignup",error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).render("signup",{
            errors : {general : "Something went Wrong. Please try again"},
            oldData :{}
        })
    }
}



const getLogin = (req,res)=>{
    try {

        return res.render("login",{
            errors : {},
            oldData : {}
        });
        
        
    } catch (error) {
        console.log("Error from getLogin",error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            errors : {general :"Something went wrong"},
            message : "Internal server error"
        })
    }
}


const postLogin = async(req,res)=>{
    try {


        const result = validationResult(req);

    if (!result.isEmpty()) {
      const errorObj = {};

      result.array().forEach(err => {
        errorObj[err.path] = err.msg;
      });

      return res.render("login", {
        errors: errorObj,
        oldData: req.body
      });
    }


        const { email, password} = req.body;

        if(!email || !password){
            return res.status(HttpStatus.BAD_REQUEST).render("login",{
                errors : {general : "Email and password is required"},
                oldData : req.body
            })
        }

    const user = await User.findOne({email});

    if(!user){
        return res.status(HttpStatus.UNAUTHORIZED).render("login",{
            errors : { email :"User not found"},
            oldData : req.body
        })
    }

    if(user.isBlocked){
        return res.status(HttpStatus.FORBIDDEN).render("login",{
            errors : {general :"Account is blocked by admin"},
            oldData : req.body
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(HttpStatus.UNAUTHORIZED).render("login",{
            errors : {password:"Incorrect password"},
            oldData : req.body
        })
    }
        return res.redirect("/")
        
    } catch (error) {
        console.log("Error from postLogin",error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).render("login",{
            errors : {general :"Something went wrong. please try agin"},
            oldData : req.body
        })
    }
}





module.exports = {
    loadHomepage,
    getLogin,
    getSignup,
    postSignup,
    postLogin
}