import React, { useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';

// context
import { UserContext } from '../../context/UserContext';

// components
import SignInAssistLinks from './../../components/SignInAssistLinks';

// assets
import hero from './../../assets/hero.jpg';

// style
import {
  ScHero
} from './styles';


// TS interface for submitted data
interface IFormInput {
  email: String;
  password: String;
  err: any;
}

function SignIn(props: any) {
  // context
  const context = useContext(UserContext);
  const { authenticatedUser } = useContext<any>(UserContext);

  // state
  const [ message, setMessage ] = useState<string[]>([]);

  // const { from } = props.location.state || { from: { pathname: '/'} };
  const { control, handleSubmit, errors } = useForm();

  // handle submit
  const onSubmit = (data: IFormInput) => {
    // store user info in cookie and redirect to authenticated page
    context.actions.signIn(data.email, data.password)
      .then( (response: any) => {
        // if user exist, then redirect to /feed, otherwise set error
        if (response === 200){
          props.history.push('/feed')
        } else {
          setMessage(response)
        }
      })
  }

  return (
    <>
      <ScHero 
        style={{
          backgroundImage: `url( ${ hero } )`,
          backgroundSize: `cover`,
          backgroundPosition: `center 43%`
          }}></ScHero>

      { // show sign in form if not logged in. Otherwise redirect to /home
        !authenticatedUser ?
        <>
          <div className="formPanel">
          <h2 className="formTitle">Sign in</h2>

          <form 
            className="form"
            onSubmit={ handleSubmit(onSubmit) } >

            {
              message ? 
              <div className="formErrorMsg">{ message }</div>
              : 
              null
            }

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
                    error={ !!errors.email } // without the '!!', error message will show on console if submitted with empty field
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
              name="password"
              as={
                <div className="formInputWrap">
                  <TextField 
                    id="password" 
                    name="password"
                    label="password"
                    type="password"
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
              <Button variant="contained" color="primary" type="submit" >Sign in</Button>
            </div>
          </form>

        </div>

        <SignInAssistLinks></SignInAssistLinks>
        </>
        :
        <Redirect to="/feed"></Redirect>
      }
    </>
  )

}

export default SignIn;