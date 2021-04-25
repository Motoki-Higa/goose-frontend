import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';

// TS interface for submitted data
interface IFormInput {
  email: String;
  password: String;
  err: any;
}

function RequestVerifyEmail(props: any) {
  // state
  const [ message, setMessage ] = useState<string[]>([]);

  // form
  const { control, handleSubmit, errors } = useForm();

  let history = useHistory();

  // handle submit
  const onSubmit = async (data: IFormInput) => {
    try {
      const requestTokenApi =  config.apiBaseUrl + '/token';
      const obj = { email: data.email };

      // this requests to send user an email verification email again
      await axios.post(requestTokenApi, obj)
        .then( response => {
          setMessage(response.data.message);
          history.push('/thanks');
        })

    } catch(err){
      setMessage(err.response.data.errors);
    }
  }

  return (
    <div className="formPanel">
      <h2 className="formTitle">Request verify email</h2>

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

        <div className="formBtnWrap">
          <Button variant="contained" color="primary" type="submit" >Request</Button>
        </div>
      </form>

    </div>
  )

}

export default RequestVerifyEmail;