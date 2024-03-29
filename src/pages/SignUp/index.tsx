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
  name: String;
  username: String;
  password: String;
}

function SignUp(props: any) {
  // context
  const context = useContext(UserContext);
  const { authenticatedUser } = useContext<any>(UserContext);

  // state
  const [ message, setMessage ] = useState([]); // for error handling from api

  // form
  const { control, handleSubmit, errors } = useForm();

  // handle submit
  const onSubmit = (data: IFormInput) => {

    // api call with the utils (custom helper function)
    context.utils.createUser(data)
      .then( (errors: any) => {
        if (errors.length) {
          setMessage(errors);
          console.log(`Error message from api: ${errors}`);
        }
        else {
          console.log(`${data.username} account is successfully created.`);
          props.history.push('/thanks')
        }
      })
      .catch( (err: any) => { // handle rejected promises
        console.log(err);
      });  
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
          <h2 className="formTitle">Sign up</h2>

          {
            message ?
            message.map( (err, index: number) => {
              return (
              <div 
                className="formErrorMsg"
                key={index} >{ err }</div>
              )
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
              <Button variant="contained" color="primary" type="submit" >Sign up</Button>
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

export default SignUp;