const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI
const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connected db");
    } catch (error) {
        console.log(err);
    }
}

module.exports = connectDb;