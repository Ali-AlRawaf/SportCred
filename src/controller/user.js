const User = require('../models/user')
const fetch = require("node-fetch");
import { getMaxListeners } from '../models/user';
import sendVerification from './mailer.js'

export const register = async (new_user) => {

  const url = "http://localhost:5000/user/register"

  const request = {
    method: "post",
    body: JSON.stringify(new_user),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;

  if (response.status === 200){
    const msg = await response.json();
    result.token = msg.token;
    result.text = msg.text;
  }else{
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const resendActivation = async (email) => {

  const url = "http://localhost:5000/user/resend-activation"

  const request = {
    method: "post",
    body: JSON.stringify({email: email}),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;

  if (response.status === 200){
    const msg = await response.json();
    result.token = msg.token;
    result.text = msg.text;
  }else{
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const checkActivation = async (email, token) => {
  const url = "http://localhost:5000/user/confirm/" + email + "/" + token;

  const request = {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;

  if(response.status === 200){
    const msg = await response.json();
    result.user = msg.user;
    result.text = msg.text;
  } else {
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const login = async (user) => {
  const url = "http://localhost:5000/user/login"

  const request = {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;

  if (response.status === 200){
    const msg = await response.json();
    result.token = msg.token;
  } else {
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}