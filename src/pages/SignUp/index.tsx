import React, { useState, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';

// context
import { UserContext } from '../../context/UserContext';

// styles
import {
  ScError
} from './styles'

// TS interface for submitted data
interface IFormInput {
  email: String;
  name: String;
  username: String;
  password: String;
}

function SignUp(props: any) {
  // initialize context for use
  const context = useContext(UserContext);

  const [ apiError, setApiError ] = useState([]); // for error handling from api
  const { control, handleSubmit, errors } = useForm();

  // handle submit
  const onSubmit = (data: IFormInput) => {

    // api call with the utils (custom helper function)
    context.utils.createUser(data)
      .then( (errors: any) => {
        if (errors.length) {
          setApiError(errors);
          console.log(`Error message from api: ${errors}`);
        }
        else {
          console.log(`${data.username} is successfully signed up and authenticated!`);

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
    <div className="formPanel">
      <h2 className="formTitle">Sign up</h2>

      {
        apiError ?
        apiError.map( (err, index: number) => {
          return <ScError 
          key={index} >{ err }</ScError>
        })
        :
        null
      }

      <form
        className="form"
        onSubmit={ handleSubmit(onSubmit) } >

        <Controller
          name="email"
          as={
            <div className="formInputWrap">
              <TextField 
                id="email"
                name="email" 
                label="Email" 
                variant="filled"
                helperText={ errors.email ? errors.email.message : null}
                error={ !!errors.email }
                />
            </div>
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
          name="name"
          as={
            <div className="formInputWrap">
              <TextField 
                id="name" 
                name="name"
                label="Name" 
                variant="filled"
                helperText={ errors.name ? errors.name.message : null}
                error={ !!errors.name }
                />
            </div>
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'Required',
          }}
        />

        <Controller 
          name="username"
          as={
            <div className="formInputWrap">
              <TextField 
                id="username" 
                name="username"
                label="username" 
                variant="filled"
                helperText={ errors.username ? errors.username.message : null}
                error={ !!errors.username }
                />
            </div>
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'Required',
          }}
        />

        <Controller 
          name="password"
          as={
            <div className="formInputWrap">
              <TextField 
                id="password" 
                name="password"
                label="password" 
                variant="filled"
                helperText={ errors.password ? errors.password.message : null}
                error={ !!errors.password }
                />
            </div>
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'Required',
          }}
        />

        <div className="formBtnWrap">
          <Button variant="contained" color="primary" type="submit" >Sign up</Button>
        </div>
      </form>

    </div>
  )
}

export default SignUp;