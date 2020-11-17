const Debate = require('../models/debate')

export const getDebate = async (debateId) => {

  const url = "http://localhost:5000/debate/getDebate/" + debateId;

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.debate = json.debate;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getOptions = async (debateId) => {

  const url = "http://localhost:5000/debate/getAllOptions/" + debateId + "/";

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.options = json.options;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getOptionNames = async (debateId) => {

  const url = "http://localhost:5000/debate/getAllOptionNames/" + debateId + "/";

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.options = json.options;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const getOptionVotes = async (debateId, optionId) => {

  const url = "http://localhost:5000/debate/optionVotes/" + debateId + "/" + optionId;

  const result = {}

  const response = await fetch(url);
  if (response.status === 200){
    const json = await response.json();
    result.status = response.status;
    result.votes = json.votes;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}

export const addDebate = async (body) => {

  const url = "http://localhost:5000/debate/addDebate";

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('debate successfully added')
    result.status = response.status;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const addVote = async (body) => {

  const url = "http://localhost:5000/debate/addVote";

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('vote successfully added')
    result.status = response.status;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const addOption = async (body) => {

  const url = "http://localhost:5000/debate/addOption";

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    console.log('option successfully added')
    result.status = response.status;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;

}

export const getAllDebates = async () => {
  const url = "http://localhost:5000/debate/"

  const request = new Request(url, {
    method: "get",
  });

  const result = {}

  const response = await fetch(request);
  if (response.status === 200){
    result.status = 200;
    const msg = await response.json();
    result.allDebates = msg.allDebates;
  } else {
    const msg = await response.text();
    result.status = response.status;
    result.error = msg;
  }

  return result;
}
