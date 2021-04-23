import React, { useState, useContext } from 'react';
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


function DeleteAccount(){
  // context
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ error, setError ] = useState<string>()

  // form
  const { control, handleSubmit, formState, errors } = useForm();
  const { isDirty } = formState;


  // submit
  const onSubmit = async (data: any) => {
    // try {
    //   // endpoint
    //   const userId = authenticatedUser._id;
    //   const pwUpdateApi = config.apiBaseUrl + '/users/' + userId + '/password/change';

    //   // creates a Base64-encoded ASCII string
    //   const encodedCredentials = btoa(`${ authenticatedUser.email }:${ data.oldPassword }`);

    //   const axiosConfig = {
    //     headers: {
    //       'Authorization': `Basic ${encodedCredentials}`,
    //       'Content-Type': 'application/json; charset=utf-8',
    //     }
    //   }

    //   const obj = {
    //     'newpassword': data.newPassword,
    //   }

    //   // send request
    //   await axios.put(pwUpdateApi, JSON.stringify(obj), axiosConfig)
    //     .then( response => {
    //       // handle close modal and form
    //       handleCloseModal();
    //       handleCloseForm();

    //       // notification
    //       handleSetNotification(response.data.message);
    //     })
      
    // } catch(err) {
    //   setError(err.response.data.error)
    // }
  };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Delete Account</div>

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
          name="password"
          as={
            <div className="formInputWrap">
              <TextField 
                id="password" 
                type="password"
                name="password"
                label="Password" 
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


        {/* submit */}
        <div className="formBtnWrap">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled={ !isDirty }>Delete Account</Button>
        </div>

      </form>
    </div> 
  )
}

export default DeleteAccount;