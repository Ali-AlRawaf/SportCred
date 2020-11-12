const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const { postValidation, getPostValidation } = require('../validations/postValidations');

// Display all posts
router.get('/', async (req, res) => {
  const allPosts = await Post.find({}).catch((error) => {
    return res.status(400).send("error getting all posts")
  });
  // ADD:
  //////////////////////////////////
  let postsArray = [];
  allPosts.forEach(post => {
    postsArray.push(post);
  });
  /////////////////////////////////
  try {
    //return res.send({allPosts: allPosts})
    // CHANGE TO:
    return res.status(200).send({ postsArray: postsArray });
  } catch (err) {
    return res.status(400).send(err)
  }
});

// Create a new post
router.post('/', async (req, res) => {
  // Front end validations
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create post
  const newPost = {
    //   author: {
    //       id: req.body.userId
    //   },
    title: req.body.title,
    description: req.body.description
  }

  try {
    const post = new Post(newPost);

    await post.save();
    return res.status(200).send({ post: post._id })

  } catch (err) {
    return res.status(400).send('error creating post');

  }

});

// Show a specific post
router.get("/:id", async (req, res) => {
  const foundPost = await Post.findById(req.params.id)
    .populate("postComment")
    .exec()
    .catch((err) => {
      return res.status(400).send(err)
    })
  return res.status(200).send({ foundPost: foundPost })
})


module.exports = router;