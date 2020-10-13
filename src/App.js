import React, { Component } from 'react';
import {testAPIString, testAPIJSON, testAPIConditional} from './controller/testAPIActions'

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // example request to controller with json response
    // we can call a different control function, but remember to also change how we extract the data from the return value
    // reponse is JSON so we use res.express, but if response is string we do not use .express
    testAPIJSON()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header> 
        <p className="App-intro">Express Response: {this.state.data}</p>
      </div>
    );
  }
}

export default App;