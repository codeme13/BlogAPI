const express = require("express");
const router = express.Router();
const blog = require("../models/blog");
const comments = require("../models/comments");


//To get all the Blogs

router.get("/home", async(req, res) => {
  try {
    const ans= await blog.find({}); 
      res.status(201).send(ans);
    } catch (err) {
      res.status(400).send(err);
    }
});


//To add a new Blog to website

router.post("/home/add", async (req, res) => {
  try {
    const data = new blog(req.body);
    console.log(data);
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
    console.log(_id);

    const data = await blog.findById({ _id: _id },select("-comments"));
    res.status(201).send(data);
  } catch (err) {
   
    console.log(err.message);
  }
});


//To delete  a Blog by its Id

router.delete("/home/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const DeLEte = await blog.findByIdAndDelete({ _id: id });
    if (!id) {
      return res.status(400).send();
    } else console.log("happy now");
    res.send("<h1>Deleted Sucessfully </h1>");
  } catch (err) {
    res.status(404).send(err);
  }
});


//To update a Blog by its Id

router.patch("/home/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      useFindAndModify: true,
    });
    const m =await data.save();
    res.send(data);
    console.log(data);
  } catch (err) {
    res.status(400).send(err);
  }
});


/*--------Comment Section ------*/


router.post('/home/:id/comment', async (req, res) => {
    // find out which post you are commenting
    const id = req.params.id;
    // get the comment text and record post id
    const comment = new comments({
    text: req.body.comment,
    post: id
})
 console.log(comment);
  // save comment
    await comment.save();
      // get blog 
    const thisblog = await blog.findById(id);
      // push the comment into the blog.comments array
    thisblog.comments.push(comment);
      // save and redirect...
    await thisblog.save((err)=> {
    if(err) {console.log(err)}
    res.redirect('/home')
})

})

router.get('/home/:id/comment',async(req,res)=>{
  const _id = req.params.id;
  const Blogfind = await blog.find({_id});
  var commenter = await comments.find({post:_id});
  try{
  commenter.forEach( element=> 
    {
     
    res.write(element.text+"\n");
  
    
    
  });
  res.status(200).send();
}
catch(err)
{
  res.status(400).send(err.message);
}
})






module.exports = router;
