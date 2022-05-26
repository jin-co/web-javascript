const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator)
// unlike 'required' unique doesn't throw an error. To make it throw an error add this plugin

module.exports = mongoose.model("User", userSchema);
