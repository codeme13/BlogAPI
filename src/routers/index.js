const express = require("express");
const router = express.Router();
const blog = require("../models/blog");
const comments = require("../models/comments");

//To get all the Blogs

router.get("/home", async (req, res) => {
  try {
    const ans = await blog.find({});
    res.status(201).send(ans);
  } catch (err) {
    res.status(400).send(err);
  }
});

//To add a new Blog to website

router.post("/home/add", async (req, res) => {
  try {
    const data = new blog(req.body);

    const dum = await data.save();
    res.send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

//To get a Blog by its Id

router.get("/home/blog/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const data = await blog.findById({ _id: _id }, select("-comments"));
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

//To delete  a Blog by its Id

router.delete("/home/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const DeLEte = await blog.findByIdAndDelete({ _id: id });
    res.redirect("/home");
  } catch (err) {
    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

//To update a Blog by its Id

router.put("/home/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      useFindAndModify: true,
    });
    const m = await data.save();
    res.send(data);
  } catch (err) {
    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

/*--------Comment Section ------*/

router.post("/home/:id/comment", async (req, res) => {
  // find out which post you are commenting
  try {
    const id = req.params.id;
    // get the comment text and record post id
    const comment = new comments({
      text: req.body.comment,
      post: id,
    });

    // save comment
    await comment.save();

    const thisblog = await blog.findById(id);

    thisblog.comments.push(comment);

    const m = await thisblog.save();

    res.redirect("/home");
  } catch (err) {
    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

router.get("/home/:id/comment", async (req, res) => {
  const _id = req.params.id;
  const Blogfind = await blog.find({ _id });
  var commenter = await comments
    .find({ post: _id })
    .select({ _id: 0, __v: 0, post: 0 });
  try {
    // commenter.forEach( element=>
    //   {

    //   res.write(element.text+"\n");

    // });
    res.send(commenter);
    // res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
