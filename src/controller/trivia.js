import { sendNotif } from "./notif";
import { getUser } from "./user";

const fetch = require("node-fetch");

export const addTrivia = async (players) => {

    const url = "http://localhost:5000/trivia/addSession"
  
    const request = {
      method: "post",
      body: JSON.stringify(players),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;

    if(result.status == 200){
        const json = await response.json()
        result.id = json.id
    } else {
        const msg = await response.text()
        result.error = msg
    }
  
    return result;
}

export const getTrivia = async (id) => {
    const url = "http://localhost:5000/trivia/" + id
  
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

    if(result.status == 200){
        const json = await response.json()
        result.trivia = json.foundSession
    } else {
        const msg = await response.text()
        result.error = msg
    }
  
    return result;
}

export const incrementScore = async (sid, pid) => {
    const url = "http://localhost:5000/trivia/add-point";
  
    const request = {
      method: "post",
      body: JSON.stringify({sid: sid, pid: pid}),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;
    const msg = await response.text()
    result.text = msg
  
    return result;
}

export const finishTrivia = async (sid, pid, total) => {
    const url = "http://localhost:5000/trivia/finish-trivia";
  
    const request = {
      method: "post",
      body: JSON.stringify({sid: sid, pid: pid}),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }
  
    const result = {}
  
    const response = await fetch(url, request);
  
    result.status = response.status;
    if(result.status == 200){
        const json = await response.json()
        result.trivia = json.trivia
        result.currPlayer = json.currPlayer
        result.otherPlayer = json.otherPlayer
    } else {
        const msg = await response.text()
        result.error = msg
    }

    const currUser = await getUser(result.currPlayer.userId)

    await sendNotif({
        sender: pid,
        notifBody: currUser.user.username + " has scored " + result.currPlayer.totalScore + "/" + total + " in your trivia battle!",
        link: result.trivia, 
        recipient: result.otherPlayer.userId,
        type: "Info"
    })

    return result;
}