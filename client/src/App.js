import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Stoproute from './components/Stoproute'
import Profile from './components/Profile'

import './components/library.css';
import './App.css';

class App extends Component {
  render() {
    return (<Router>
      <div className="App">
        <Route exact path="/" component={ Home } />
        <Route exact path="/signup" component={ Signup } />
        <Route exact path="/signin" component={ Signin } />
        <Route exact path="/stoproute" component={ Stoproute } />
        <Route exact path="/profile" component={ Profile } />
      </div>
    </Router>);
  }
}

export default App;
