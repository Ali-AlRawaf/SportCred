const express = require('express');
const router = express.Router({ mergeParams: true });
const Post = require('../models/post')
const PostComment = require('../models/postComment');
const {postCommentValidation} = require('../validations/postCommentValidations');

// Create a new postComment
router.post('/', async (req, res) => {
  // Front end validations
  const {error} = postCommentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find post
  const foundPost = await Post.findById(req.params.id)
    .catch((err) => {
        return res.status(400).send(err)
    })
  if (foundPost == null) {
    return res.status(500).send("foundPost is null");  
  }

  // Create postComment
  const newPostComment = {
    //   author: {
    //       id: req.body.userId
    //   },
      text: req.body.text
  }

  try{
    // Save postComment
    const postComment = new PostComment(newPostComment);
    await postComment.save();

    // Update post with new postComment
    await foundPost.comments.push(postComment);
    await foundPost.save();

    return res.status(200).send("postComment saved")

  } catch(err){
    return res.status(400).send('error creating postComment');
  }
});

module.exports = router;