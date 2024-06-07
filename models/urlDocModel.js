const mongoose = require("mongoose");

const UrlDocSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    trim: true,
  },
  short_url: {
    type: String,
    unique: true,
  },
});

const urlDoc = mongoose.model("urlDoc", UrlDocSchema);

module.exports = urlDoc;
