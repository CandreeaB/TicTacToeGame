import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameTable from './components/GameTable'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TicTacToe</h1>
        </header>
        <GameTable/>
      </div>
    );
  }
}

export default App;
