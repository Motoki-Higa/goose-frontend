import React, { useState, useRef, useContext } from 'react';
import { Redirect, NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';

// context
import { NotificationContext } from '../../context/NotificationContext';

function ResetPw(){
  // context
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ message, setMessage ] = useState();

  // form
  const { control, handleSubmit, formState, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");
  const { isDirty } = formState;

  let history = useHistory();

  // username params
  const { token } = useParams<{ token: string }>();

  // submit
  const onSubmit = async (data: any) => {
    try {
      // endpoint
      const resetPwApi = config.apiBaseUrl + '/reset-password/' + token;

      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      }

      const obj = {
        'newpassword': data.newPassword,
      }

      // send request
      await axios.put(resetPwApi, JSON.stringify(obj), axiosConfig)
        .then( response => {
          // notification
          handleSetNotification(response.data.message);
          // redirect
          history.push('/signin');
        })
      
    } catch(err) {
      console.log(err.response.data.error)
      setMessage(err.response.data.error)
    }
  };

  return (
    <div className="formPanel">
      <div className="formTitle">Change password</div>

      <p className="formDesc">This form is valid for 10 mins from your request.</p>

      <form 
        className="form" 
        onSubmit={ handleSubmit(onSubmit) }
        >

        {
          message ? 
          <div className="formErrorMsg">{ message }</div>
          : 
          null
        }

        <Controller 
          name="newPassword"
          as={
            <div className="formInputWrap">
              <TextField 
                id="newPassword"
                type="password"
                name="newPassword"
                label="New password" 
                variant="filled"
                // defaultValue=""
                helperText={ errors.newPassword ? errors.newPassword.message : null}
                error={ !!errors.newPassword }
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
          name="confirmNewPassword"
          as={
            <div className="formInputWrap">
              <TextField 
                id="confirmNewPassword"
                type="password"
                name="confirmNewPassword"
                label="Confirm new password" 
                variant="filled"
                // defaultValue=""
                helperText={ errors.confirmNewPassword ? errors.confirmNewPassword.message : null}
                error={ !!errors.confirmNewPassword }
                />
            </div>
          }
          control={control}
          defaultValue=""
          rules={{
            required: 'Required',
            validate: value => value === newPassword.current || "The passwords do not match"
          }}
        />


        {/* submit */}
        <div className="formBtnWrap">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled={ !isDirty }>Reset password</Button>
        </div>

      </form>
    </div> 
  )
}

export default ResetPw;