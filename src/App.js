import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class Main extends Component {
  state = {
    persons: []
  }
  componentDidMount() {
    console.log("heyy22");
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        console.log("hello == " + persons);
        this.setState({ persons });
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ul>
              {this.state.persons.map(person => <li>{person.name}</li>)}
            </ul>
          </a>
        </header>
      </div>
    );
  }
}
export default Main;
