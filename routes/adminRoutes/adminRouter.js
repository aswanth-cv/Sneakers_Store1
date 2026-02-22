const express = require("express");
const adminRouter = express.Router();


const adminController = require("../../controllers/admin/adminController");


adminRouter.get("/adminLogin",adminController.getAdnimLogin)


module.exports = adminRouter;

