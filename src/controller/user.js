const User = require('../models/user')

export const register = async (new_user) => {

  const url = "http://localhost:5000/user/register"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(new_user),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  })

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    result.status = 200
    const msg = await response.json()
    result.user = msg.user;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const login = async (user) => {
  const url = "http://localhost:5000/user/login"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  })

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    result.status = 200
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}