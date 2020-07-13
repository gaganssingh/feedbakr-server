const mongoose = require("mongoose");
const { Schema } = mongoose;

// Table schema for the database
const userSchema = new Schema({
   googleId: String,
});

// Creating the actual database table
mongoose.model("users", userSchema); // "users" => table name
