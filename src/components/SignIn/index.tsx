import React, { useState, useContext } from 'react';
import { Context } from './../../Context';
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';
import {
  ScPanel,
  ScTitle,
  ScForm,
  ScInputWrap,
  ScBtnWrap
} from './styles'

// TS interface for submitted data
interface IFormInput {
  email: String;
  password: String;
}

function SignIn(props: any) {
  // initialize context for use
  const context = useContext(Context);

  const [ apiError, setApiError ] = useState([]); // for error handling from api
  const { control, handleSubmit, errors } = useForm();

  // handle submit
  const onSubmit = (data: IFormInput) => {

    // api call with the utils (custom helper function)
    context.utils.getUser(data.email, data.password)
      .then( (errors: any) => {
        if (errors.length) {
          setApiError(errors);
          console.log(`Error message from api: ${errors}`);
        }
        else {
          console.log(`SUCCESS! ${data.email} is now signed in!`);

          // store user info in cookie and redirect to authenticated page
          context.actions.signIn(data.email, data.password)
            .then(() => {
              props.history.push('/authenticated')
            })
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
                error={ !!errors.email } // without the '!!', error message will show on console if submitted with empty field
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
                error={ !!errors.password }
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