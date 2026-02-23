const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/user/userController");
const authValidator = require("../../validators/authValidator");
const {authMiddleware} = require("../../middlewares/authMiddleware");
const noCache = require("../../middlewares/noCacheMiddleware");



userRouter.get("/",noCache,authMiddleware,userController.loadHomepage);
userRouter.get("/login",noCache,userController.getLogin);
userRouter.post("/login",authValidator.loginValidation,userController.postLogin)
userRouter.get("/signup",noCache,userController.getSignup);
userRouter.post("/signup",authValidator.signupValidation,userController.postSignup)





module.exports =  userRouter;