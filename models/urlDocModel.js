const mongoose = require("mongoose");

const UrlDocSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  short_url: {
    type: String,
    unique: true,
  },
});

const UrlDoc = mongoose.model("urlDoc", UrlDocSchema);

module.exports = UrlDoc;
