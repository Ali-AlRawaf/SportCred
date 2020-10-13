  async function testAPIString(){
    const response = await fetch('/testAPI/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  async function testAPIJSON(){
    const response = await fetch('/testAPI/json');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log(body.express);
    return body;
  };
  
  async function testAPIConditional(request){
    const response = await fetch('/testAPI/condition', {
      method: 'get',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: {req: request}
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  module.exports = {
    testAPIString: testAPIString,
    testAPIJSON: testAPIJSON,
    testAPIConditional: testAPIConditional
  };