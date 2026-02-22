
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes/userRouter");
const adminRouter = require("./routes/adminRoutes/adminRouter");


connectDB();

app.use(express.json());
app.use(express.urlencoded( { extended:true } ));


app.set("view engine","ejs");
app.set("views",[
    path.join(__dirname, "views/user"),
    path.join(__dirname, "views/admin"),
    path.join(__dirname, "views")
]);

app.use(express.static(path.join(__dirname, "public")))

app.use("/",userRouter);
app.use("/admin",adminRouter);

const PORT = process.env.PORT;


app.listen(PORT,()=>{
    console.log("http://localhost:3005")
})