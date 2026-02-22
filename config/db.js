const mongoose = require("mongoose");
const dotenv = require("dotenv");


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Databse connection successful");
    } catch (error) {
        console.log(`Database connection faild ${error.message}`);
    }
}

module.exports = connectDB;