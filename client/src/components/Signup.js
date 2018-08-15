import React, { Component } from 'react'
import axios from 'axios';

import './library.css';
import './Signup.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      city: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  signUp() {
    const payload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      city: this.state.city
    }

    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem("token");

    this.setState({ errors: {} })

    axios.post('/auth/register', payload)
         .then(res => {
           window.location = 'signin'
         })
         .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    return (<div className='fullSize flexCol'>
        <div className='signUpTitle'>Sign Up</div>
        <input type="text" name="username"  value={ this.state.username }  onChange={this.onChange} placeholder='username'></input>
        <div><p className='error'>{ this.state.errors.username ? this.state.errors.username : null }</p></div>

        <input type="text" name="email"     value={ this.state.email }     onChange={this.onChange} placeholder='email'></input>
        <div><p className='error'>{ this.state.errors.email ? this.state.errors.email : null }</p></div>

        <input type="text" name="password"  value={ this.state.password }  onChange={this.onChange} placeholder='password'></input>
        <div><p className='error'>{ this.state.errors.password ? this.state.errors.password : null }</p></div>

        <input type="text" name="password2" value={ this.state.password2 } onChange={this.onChange} placeholder='password2'></input>
        <div><p className='error'>{ this.state.errors.password2 ? this.state.errors.password2 : null }</p></div>

        <input type="text" name="city"      value={ this.state.city }      onChange={this.onChange} placeholder='city'></input>
        <div><p className='error'>{ this.state.errors.city ? this.state.errors.city : null }</p></div>
        <div className='submitBtn flexRow' onClick={ this.signUp }>
          <p>Submit</p>
        </div>
      </div>);
  }
}

export default Signup;
