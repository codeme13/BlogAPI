const mongoose = require("mongoose");

const validator = require("validator");

const blogSchema = new mongoose.Schema({
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

const blog = new mongoose.model("blog", blogSchema);

module.exports = blog;
