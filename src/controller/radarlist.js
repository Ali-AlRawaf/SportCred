const Radar = require('../models/radar')

export const addFollower = async (body) => {

  const url = "http://localhost:5000/radar/addFollower"

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  })

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('follower successfully added')
    result.status = response.status;
  }else{
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getFollowers = async (body) => {

  const response = await fetch('/radar/getFollowers', {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)
  });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
};
}
