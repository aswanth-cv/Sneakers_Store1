const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/user/userController");
const authValidator = require("../../validators/authValidator");



userRouter.get("/",userController.loadHomepage);
userRouter.get("/login",userController.getLogin);
userRouter.post("/login",authValidator.loginValidation,userController.postLogin)
userRouter.get("/signup",userController.getSignup);
userRouter.post("/signup",authValidator.signupValidation,userController.postSignup)





module.exports =  userRouter;