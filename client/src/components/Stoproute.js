import React, { Component } from 'react'
import axios from 'axios';

import './library.css';
import './Stoproute.css';

class Stoproute extends Component {
  render() {
    return (<div className='fullSize flexCol'>
        <p className='stopText'>SORRY YOU MUST LOG IN FIRST</p>
      </div>);
  }
}

export default Stoproute;
