import React, { useState, useContext, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import config from '../../../config';
import { TextField, Button } from '@material-ui/core';

// contexts
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';
import { NotificationContext } from '../../../context/NotificationContext';

// styles
import {
  ScError
} from '../styles'


function ChangePassword(){
  // context
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ error, setError ] = useState<string>()

  // form
  const { control, handleSubmit, formState, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");
  const { isDirty } = formState;


  // submit
  const onSubmit = async (data: any) => {
    try {
      // endpoint
      const userId = authenticatedUser._id;
      const pwUpdateApi = config.apiBaseUrl + '/users/' + userId + '/password/change';

      // creates a Base64-encoded ASCII string
      const encodedCredentials = btoa(`${ authenticatedUser.email }:${ data.oldPassword }`);

      const axiosConfig = {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json; charset=utf-8',
        }
      }

      const obj = {
        'newpassword': data.newPassword,
      }

      // send request
      await axios.put(pwUpdateApi, JSON.stringify(obj), axiosConfig)
        .then( response => {
          // handle close modal and form
          handleCloseModal();
          handleCloseForm();

          // notification
          handleSetNotification(response.data.message);
        })
      
    } catch(err) {
      console.log(err.response.data.error)
      setError(err.response.data.error)
    }
  };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Change password</div>

      {
        error ?
        <ScError>{ error }</ScError>
        :
        null
      }

      <form 
        className="form" 
        onSubmit={ handleSubmit(onSubmit) }
        >

        <Controller 
          name="oldPassword"
          as={
            <div className="formInputWrap">
              <TextField 
                id="oldPassword" 
                type="password"
                name="oldPassword"
                label="Old password" 
                variant="filled"
                // defaultValue=""
                helperText={ errors.oldPassword ? errors.oldPassword.message : null}
                error={ !!errors.oldPassword }
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
            disabled={ !isDirty }>Update</Button>
        </div>

      </form>
    </div> 
  )
}

export default ChangePassword;