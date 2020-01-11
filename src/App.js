import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Main from './content';
import './App.css';

class App extends Component {
  state = {
    persons: []
  }
  componentDidMount() {
    // console.log("heyy22");
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        console.log("hello == " + persons);
        this.setState({ persons });
      });

    // const request = require('request');
    // request('https://cors-anywhere.herokuapp.com/' + 'http://stackabuse.com', function (err, res, body) {
    //   console.log("request == " + body);
    // });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {this.state.persons.map(person => <li>{person.name}</li>)}
          </ul>
        </header>
        {/* <div>
          <Main />
        </div> */}
      </div>
    );
  }
}
export default App;
