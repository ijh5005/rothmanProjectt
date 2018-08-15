import React, { Component } from 'react'
import axios from 'axios';

import './library.css';
import './Signup.css';

class Signin extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  signIn() {
    const payload = {
      email: this.state.email,
      password: this.state.password
    }

    this.setState({ errors: {} })

    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem("token");

    axios.post('/auth/signin', payload)
         .then(res => {
           localStorage.setItem("token", res.data.token);
           window.location = 'profile';
         })
         .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    return (<div className='fullSize flexCol'>
        <div className='signUpTitle'>Sign In</div>
        <input type="text" name="email"     value={ this.state.email }     onChange={this.onChange} placeholder='email'></input>
        <div><p className='error'>{ this.state.errors.email ? this.state.errors.email : null }</p></div>

        <input type="text" name="password"  value={ this.state.password }  onChange={this.onChange} placeholder='password'></input>
        <div><p className='error'>{ this.state.errors.password ? this.state.errors.password : null }</p></div>
        <div className='submitBtn flexRow' onClick={ this.signIn }>
          <p>Submit</p>
        </div>
      </div>);
  }
}

export default Signin;
