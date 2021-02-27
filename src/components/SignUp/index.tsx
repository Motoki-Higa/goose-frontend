import React, { Component } from 'react';
import config from './../../config';
import { TextField, Button } from '@material-ui/core';
import {
  ScPanel,
  ScTitle,
  ScForm,
  ScInputWrap,
  ScBtnWrap
} from './styles'


class SignUp extends Component {

  state = {
    email: '',
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  // update state on field change
  change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  // submit
  submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // get each values from state
    const {
      email,
      name,
      username,
      password,
    } = this.state;

    // set options to pass to api request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        email,
        name,
        username,
        password,
      })
    };

    // function to send request and get response
    async function createUser(user: any) {
      const response = await fetch( config.apiBaseUrl + '/users', user);
    
      if (response.status === 201) {
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          return data.errors;
        });
      }
      else {
        throw new Error();
      }
    };

    // run the function
    createUser(options)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`${username} is successfully signed up and authenticated!`);
        }
      })
      .catch( err => { // handle rejected promises
        console.log(err);
      });  
  }

  render() {
    return (
      <ScPanel>
        <ScTitle>Sign up</ScTitle>
  
        <ScForm
          onSubmit={ this.submit } >

          <ScInputWrap>
            <TextField 
              id="email"
              name="email" 
              label="Email" 
              variant="filled"
              onChange={ this.change } />
          </ScInputWrap>
          <ScInputWrap>
            <TextField 
              id="name" 
              name="name"
              label="Name" 
              variant="filled"
              onChange={ this.change } />
          </ScInputWrap>
          <ScInputWrap>
            <TextField 
              id="username" 
              name="username"
              label="Username" 
              variant="filled"
              onChange={ this.change } />
          </ScInputWrap>
          <ScInputWrap>
            <TextField 
              id="password" 
              name="password"
              label="Password" 
              variant="filled"
              onChange={ this.change } />
          </ScInputWrap>

          <ScBtnWrap>
            <Button variant="contained" color="primary" type="submit" >Sign up</Button>
          </ScBtnWrap>
        </ScForm>
  
      </ScPanel>
    )
  }
  
}

export default SignUp;