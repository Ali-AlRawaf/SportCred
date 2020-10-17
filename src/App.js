import React, { Component } from 'react';
import {testAPIString, testAPIJSON, testAPIConditional} from './controller/testAPIActions'
import {register, login} from './controller/user.js'

class App extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  formSubmit = e => {
    e.preventDefault();
    login(this.state)
    .then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header> 
        <div>
          <form onSubmit={this.formSubmit}>
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={this.handleChange}
            ></input>
            <input
              name="password"
              type="text"
              placeholder="password"
              onChange={this.handleChange}
            ></input>
            <button className="form-submit" type="buton" onSubmit={this.formSubmit}>
              Submit
            </button>
          </form>

        </div>
      </div>
    );
  }
}

export default App;