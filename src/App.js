import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import EmployeesList from "./components/EmployeesList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="My Shift Manager" />
          <h1 className="App-title">My Shift Manager</h1>
        </header>
        <main className="App-main">
          <EmployeesList />
        </main>
      </div>
    );
  }
}

export default App;
