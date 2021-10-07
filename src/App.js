import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
    this.testFunction = this.testFunction.bind(this)
  }
  componentDidMount(){
    const form = document.querySelector('form');
    form.addEventListener('submit', this.testFunction)
  }
  testFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    data = Object.fromEntries(data.entries());
    fetch('http://localhost:3000/testAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => 
      response.json().then((data) => {console.log(data)}))
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
          <label for="id">ID:</label>
          <input type="text" name="id" />
          <br/>
          <label for="owner">Owner:</label>
          <input type="text" name="owner" />
          <br/>
          <label for="location">Location:</label>
          <input type="text" name="location" />
          <br/>
          <label for="price">Price:</label>
          <input type="number" name="price" />
          <br/>
          <button type="submit">Submit</button>
        </form>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );}
}

export default App;
