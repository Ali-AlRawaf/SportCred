const User = require('../models/user')
const fetch = require("node-fetch");

export const PAYLOAD_TYPES = {
  REGISTER_USER: "REGISTER_USER",
  LOGIN_USER: "LOGIN_USER",
};

export const register = (new_user) => {

  return async (dispatch) => {

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
      const msg = await response.json()
      result.user = msg.user;
      dispatch({ type: PAYLOAD_TYPES.REGISTER_USER, payload: msg.user });
    }else{
      const msg = await response.text();
      result.error = msg;
    }

    return result;
  }
}

export const resendActivation = async (userId) => {

  const url = "http://localhost:5000/user/resend-activation"

  const request = {
    method: "post",
    body: JSON.stringify({userId: userId}),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);

  result.status = response.status;
  const text = await response.text();
  result.text = text;

  return result;
}

export const login = (user) => {

  return async (dispatch) => {
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

    if (response.status === 200 || response.status === 201){
      const msg = await response.json()
      result.user = msg.user;
      dispatch({ type: PAYLOAD_TYPES.LOGIN_USER, payload: msg.user });
    }else{
      const msg = await response.text();
      result.error = msg;
    }  

    return result;

  }
}

export const resetPassword = async (email) => {

  const url = "http://localhost:5000/user/forgot-password"

  const request = {
    method: "post",
    body: JSON.stringify(email),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  }

  const result = {}

  const response = await fetch(url, request);

  result.status = response.status;
  const text = await response.text();
  result.text = text;

  return result;
}

export const getUser = async (userId) => {
  const url = "http://localhost:5000/user/get-user/" + userId

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

  if (response.status === 200){
    const msg = await response.json();
    result.user = msg;
  }else{
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}
export const editData = async (userData) => {
        const response = await fetch(
            "http://localhost:5000/user/edit-prof",
            {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "auth-token": "jsonwebtoken",
                },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    status: userData.status,
                    bio: userData.bio,
                    password: userData.password,
                    description: userData.description,
                }),
            }
        );
        const result = {}
        if (response.status === 200){
          const msg = await response.json()
          result.user = msg.user;
          dispatch({ type: PAYLOAD_TYPES.REGISTER_USER, payload: msg.user });
        }else{
          const msg = await response.text();
          result.error = msg;
        }
        return result;
    }