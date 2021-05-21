const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Comments = require("../models/comments");



router.get("/home", async (req, res) => {
  try {
    const ans = await Blog.find({});
    res.status(201).send(ans);
  } catch (err) {
    res.status(400).send(err);
  }
});



router.post("/home/add", async (req, res) => {
  try {
    const data = new Blog(req.body);

    await data.save();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});



router.get("/home/blog/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Blog.findById({ _id: _id });
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});



router.delete("/home/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete({ _id: id });
    res.redirect("/home");
  } catch (err) {
    res.status(400).send({
      error: true,
      message: "Unable to delete Blog",
    });
  }
});



router.put("/home/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      useFindAndModify: false,
    });
    await data.save();
    res.send(data);
  } catch (err) {
    res.status(400).send({
      error: true,
      message: "Unable to update your Blog",
    });
  }
});

router.post("/home/:id/comment", async (req, res) => {
  try {
    const id = req.params.id;

    const comment = new Comments({
      text: req.body.comment,
      post: id,
    });

    await comment.save();

    const blog = await Blog.findById(id);

    blog.comments.push(comment);

    await blog.save();

    res.send({
      error: false,
      message: "Commented Sucessfully",
    });
  } catch (err) {
    res.status(400).send({
      error: true,
      message: "Unable to Comment",
    });
  }
});

router.get("/home/:id/comment", async (req, res) => {
  try {
    const _id = req.params.id;
    const blog = await Blog.find({ _id });
    var comment = await Comments.find({ post: _id }).select({
      _id: 0,
      __v: 0,
      post: 0,
    });
    res.send(comment);
  } catch (err) {
    res.status(400).send({
      error: true,
      message: "Unable to get comments",
    });
  }
});

module.exports = router;
