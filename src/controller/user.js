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

    if (response.status === 200){
      result.status = 200
      const msg = await response.json()
      result.user = msg.user;
      dispatch({ type: PAYLOAD_TYPES.REGISTER_USER, payload: msg.user });
    }else{
      const msg = await response.text();
      result.status = response.status;
      result.error = msg;
    }

    return result;

  }

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
    if (response.status === 200){
      result.status = 200
      const msg = await response.json()
      result.user = msg.user;
      dispatch({ type: PAYLOAD_TYPES.LOGIN_USER, payload: msg.user });

    }else{
      const msg = await response.text();
      result.status = response.status;
      result.error = msg;
    }  

    return result;

  }


}