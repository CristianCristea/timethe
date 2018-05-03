import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    const navLinks = ['My Projects', 'Finished Projects'];

    return (
      <div className="app">
        <Sidebar links={navLinks} />
        <Header title="My Projects" />
      </div>
    );
  }
}

export default App;
