import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import config from './../../config';
import { TextField, Button } from '@material-ui/core';
import {
  ScPanel,
  ScTitle,
  ScForm,
  ScInputWrap,
  ScBtnWrap
} from './styles'

// typescript's interface
interface IFormInput {
  email: String;
  name: String;
  username: String;
  password: String;
}

function SignIn() {
  // error messages from api (user wont get this msg as validation is handled in FE)
  // having this state in case dev want to use it
  const [ apiError, setApiError ] = useState([]);

  // react hook form
  const { control, handleSubmit, errors } = useForm();

  // handle submit
  const onSubmit = (data: IFormInput) => {
    console.log(data);

    // encode email and password values to Base64-encoded ASCII string
    const encodedCredentials = btoa(`${data.email}:${data.password}`);

    // set options to pass to api request
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${encodedCredentials}`
      },
    };

    console.log(options);

    // function to send request and get response
    const getUser = async (user: Object) => {
      const response = await fetch( config.apiBaseUrl + '/users', user);

      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    };

    // run the function
    getUser(options)
      .then( errors => {
        if (errors.length) {
          setApiError(errors);
          console.log(`Error message from api: ${apiError}`);
        } else {
          console.log(`SUCCESS! ${data.username} is now signed in!`);
        }
      })
      .catch( err => { // handle rejected promises
        console.log(err);
      });  
  }

  return (
    <ScPanel>
      <ScTitle>Sign in</ScTitle>

      <ScForm
      onSubmit={ handleSubmit(onSubmit) } >

        <Controller
          name="email"
          as={
            <ScInputWrap>
              <TextField 
                id="email"
                name="email" 
                label="Email" 
                variant="filled"
                helperText={ errors.email ? errors.email.message : null}
                error={ errors.email }
                />
            </ScInputWrap>
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          }}
        />

        <Controller 
          name="password"
          as={
            <ScInputWrap>
              <TextField 
                id="password" 
                name="password"
                label="password" 
                variant="filled"
                helperText={ errors.password ? errors.password.message : null}
                error={ errors.password }
                />
            </ScInputWrap>
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'Required',
          }}
        />

        <ScBtnWrap>
          <Button variant="contained" color="primary" type="submit" >Sign in</Button>
        </ScBtnWrap>
      </ScForm>

    </ScPanel>
  )

}

export default SignIn;