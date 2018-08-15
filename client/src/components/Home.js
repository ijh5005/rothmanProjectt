import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './library.css';
import './Home.css';

class Home extends Component {
  constructor(){
    super();
    this.state = {}
  }

  componentWillMount(){
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem("token");
  }

  render() {
    return (<div className='fullSize flexRow'>
        <div className='authBtn flexRow'>
          <Link to='/signin'>Sign In</Link>
        </div>
        <div className='authBtn flexRow'>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </div>);
  }
}

export default Home;
