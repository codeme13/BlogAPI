const mongoose = require("mongoose");

const validator = require("validator");

const fullblog = new mongoose.Schema({
  writer: {
    type: String,
    required: true,
    minlength: 3,
  },
  date: {
    type: String,
    default: new Date().toString(),
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  blog: {
    type: String,
    minlength: 30,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const blogdata = new mongoose.model("blogdata", fullblog);

module.exports = blogdata;
