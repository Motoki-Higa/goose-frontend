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


function ChangePassword(){
  // context
  const { authenticatedUser, handleSetIsAccountUpdated, handleUpdateAuthUser } = useContext<any>(UserContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ errors, setErrors ] = useState<string[]>([])

  // form
  const { control, handleSubmit, formState } = useForm();
  const { isDirty } = formState;


  // submit
  const onSubmit = async (data: any) => {
    // try {
    //   // endpoint
    //   const userId = authenticatedUser._id;
    //   const accountUpdateApi = config.apiBaseUrl + '/users/' + userId + '/password/change';

    //   const obj = {
    //     'oldPassword': data.oldPassword,
    //     'newPassword': data.newPassword,
    //     'confirmNewPassword': data.confirmNewPassword
    //   }

    //   // send request
    //   await axios.put(accountUpdateApi, obj)
    //     .then( response => {
    //       // this handles to update authuser state and cookie
    //       handleUpdateAuthUser(response.data.user)

    //       // update context to re-render associate component
    //       handleSetIsAccountUpdated();          

    //       handleCloseModal();
    //       handleCloseForm();

    //       // notification
    //       handleSetNotification(response.data.message);
    //     })
      
    // } catch(err) {
    //   setErrors(err.response.data.errors)
    // }
  };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Change password</div>

      {
        errors ?
        errors.map( (err, index: number) => {
          return <ScError 
          key={index} >{ err }</ScError>
        })
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
                name="oldPassword"
                label="Old password" 
                variant="filled"
                defaultValue=""
                />
            </div>
          }
          control={control}
          defaultValue=""
        />

        <Controller 
          name="newPassword"
          as={
            <div className="formInputWrap">
              <TextField 
                id="newPassword" 
                name="newPassword"
                label="New password" 
                variant="filled"
                defaultValue=""
                />
            </div>
          }
          control={control}
          defaultValue=""
        />

        <Controller 
          name="confirmNewPassword"
          as={
            <div className="formInputWrap">
              <TextField 
                id="confirmNewPassword" 
                name="confirmNewPassword"
                label="Confirm new password" 
                variant="filled"
                defaultValue=""
                />
            </div>
          }
          control={control}
          defaultValue=""
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