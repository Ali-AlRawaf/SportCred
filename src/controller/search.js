const fetch = require("node-fetch");


export const searchUsers = async (name) => {
  const url = 'http://localhost:5000/search/searchName?username='+name.username

    const result = {}
  
    const response = await fetch(url);
    if (response.status === 200){
      result.status = 200
      result.result = await response.json()
    }else{
      const msg = await response.text();
      result.status = response.status;
      result.error = msg;
    }
  
    return result;
}