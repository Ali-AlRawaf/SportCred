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

  const response = await fetch(request);
  if (response.status === 200){
    alert('signed up')
  }else{
    alert(response)
  }

  return response;

}

