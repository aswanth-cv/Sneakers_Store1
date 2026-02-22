const {body} = require("express-validator");
const User = require("../models/userSchema");

const loginValidation = [
    //email validation

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required")
    .bail()
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),

    //password validation

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({min:6})
    .withMessage("Password must be at least 6 charactors")
]


const signupValidation = [

    body("name")
    //name validation
    .trim()
    .notEmpty().withMessage("Name is required")
    .bail()
    .isLength({min:3}).withMessage("Name must be at least 3 charactors")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name must  contains only letters"),


    body("email")
    //email validation
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),


    body("phone")
    //phone validation
    .notEmpty().withMessage("Phone is rquired")
    .isNumeric().withMessage("Phone must contains only numbers")
    .isLength({min:10,max:10}).withMessage("Phone must be 10 digits"),



    body("password")
    //password validation
    .notEmpty().withMessage("password is required")
    .bail()
    .isLength({min:6}).withMessage("Password must be at least 6 charactores"),




    body("confirmPassword")

    .notEmpty().withMessage("Confirm password is required")
    .custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error("Password do not match")
        }
        return true;
    })


    
]




module.exports = {
    loginValidation,
    signupValidation
}