import React, { useState, useContext } from 'react';
import { Context } from './../../Context';
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
  // initialize context for use
  const context = useContext(Context);

  const [ apiError, setApiError ] = useState([]); // for error handling from api
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

    // api call with the utils (custom helper function)
    context.utils.getUser(options)
      .then( (errors: any) => {
        if (errors.length) {
          setApiError(errors);
          console.log(`Error message from api: ${apiError}`);
        } else {
          console.log(`SUCCESS! ${data.username} is now signed in!`);
        }
      })
      .catch( (err: any) => { // handle rejected promises
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