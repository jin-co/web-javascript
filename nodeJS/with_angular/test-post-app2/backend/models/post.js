const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  auth: { type: mongoose.Schema.Types.ObjectId, required: true },
  imagePath: { type: String },
});

module.exports = mongoose.model("Post", postSchema);