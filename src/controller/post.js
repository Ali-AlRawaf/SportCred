const Post = require('../models/post');
const fetch = require("node-fetch");

export const newPost = async (new_post) => {

  const url = "http://localhost:5000/post/"

  const request = {
    method: "post",
    body: JSON.stringify(new_post),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);

  if (response.status === 200){
    result.status = 200
    const msg = await response.json()
    result.post = msg.post;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getAllPosts = async () => {
  const url = "http://localhost:5000/post/"

  const request = {
    method: "get",
  }

  const result = {}

  const response = await fetch(url, request);
  if (response.status === 200){
    result.status = 200
    const msg = await response.json()
    result.allPosts = msg.allPosts;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getPost = async (post_id) => {
  
  const result = {}

  if (post_id == "") {
    const msg = "Post id is required"
    result.status = 400
    result.error = msg
    return result
  }
      
  const url = "http://localhost:5000/post/" + post_id
  
  const request = {
    method: "get",
  }
  
  const response = await fetch(url, request);
  if (response.status === 200){
    result.status = 200
    const msg = await response.json()
    result.foundPost = msg.foundPost;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }
  
  return result;
}