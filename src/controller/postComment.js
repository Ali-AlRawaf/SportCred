const PostComment = require('../models/post');
const fetch = require("node-fetch");

export const newPostComment = async (new_post_comment, post_id) => {

  const url = "http://localhost:5000/post/" + post_id + "/postComment/"

  const request = {
    method: "post",
    body: JSON.stringify({text: new_post_comment}),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);

  if (response.status === 200){
    result.status = 200
    //const msg = await response.json()
    //result.user = msg.user;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}