import React, { Component } from 'react'
import axios from 'axios';

import './library.css';
import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      city: '',
      errors: {},
      showPofile: false,
      editField: null
    }
    this.onChange = this.onChange.bind(this);
    this.edit = this.edit.bind(this);
    this.editThis = this.editThis.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  componentWillMount(){
    // Retrieve jwt token
    const token = localStorage.getItem("token") || null;

    if(token){
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization']
    }

    // check for auth and propulate page
    axios.get('/auth/current')
         .then(res => {
           this.setState({
             id: res.data.id,
             username: res.data.username,
             email: res.data.email,
             city: res.data.city,
             showPofile: true,
             usernameUpdate: '',
             emailUpdate: '',
             cityUpdate: ''
           })
         })
         .catch(err => {
           console.log(err);
           window.location = '/stoproute'
         })
  }

  edit(field){
    return (this.editField === field);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  editThis(e){
    const id = e.target.id;
    if(this.state.editField !== id){
      this.setState({ editField: id })
    } else {
      const payload = {
        username: (this.state.usernameUpdate !== '') ? this.state.usernameUpdate : this.state.username,
        email:    (this.state.emailUpdate !== '')    ? this.state.emailUpdate    : this.state.email,
        city:     (this.state.cityUpdate !== '')     ? this.state.cityUpdate     : this.state.city
      }
      console.log(payload);
      axios.post('/user/update', payload)
           .then(res => {
             this.setState({
               username: res.data.username,
               email: res.data.email,
               city: res.data.city
             })
           })
           .catch(err => console.log(err))
      this.setState({ editField: null })
    }
  }

  deleteProfile(){
    const payload = { id: this.state.id }
    axios.delete('/user/delete', payload)
         .then(res => window.location = '/')
         .catch(err => console.log(err))
  }

  render() {
    return (<div className='fullSize flexCol'>
          <div id='delete' className='pointer' onClick={this.deleteProfile}>DELETE PROFILE</div>
          <p className='profileHaed'>{this.state.showPofile ? 'PROFILE' : ''}</p>
          <div className='profileBox flexRow'>
            {(this.state.editField !== 'username') ? <p className='profileInfo'>{this.state.username ? this.state.username : null}</p> : <input type="text" name="usernameUpdate" value={ this.state.usernameUpdate } onChange={this.onChange} placeholder='edit here'></input>}
            <div id='username' className='editBtn pointer' onClick={this.editThis}><p>EDIT</p></div>
          </div>
          <div className='profileBox flexRow'>
            {(this.state.editField !== 'email') ? <p className='profileInfo'>{this.state.email ? this.state.email : null}</p> : <input type="text" name="emailUpdate" value={ this.state.emailUpdate } onChange={this.onChange} placeholder='edit here'></input>}
            <div id='email' className='editBtn pointer' onClick={this.editThis}><p>EDIT</p></div>
          </div>
          <div className='profileBox flexRow'>
            {(this.state.editField !== 'city') ? <p className='profileInfo'>{this.state.city ? this.state.city : null}</p> : <input type="text" name="cityUpdate" value={ this.state.cityUpdate } onChange={this.onChange} placeholder='edit here'></input>}
            <div id='city' className='editBtn pointer' onClick={this.editThis}><p>EDIT</p></div>
          </div>
      </div>);
  }
}

export default Profile;
