import React, { useState, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import config from './../../../config';
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


function EditProfile(){
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
    try {
      // endpoint
      const userId = authenticatedUser._id;
      const accountUpdateApi = config.apiBaseUrl + '/users/' + userId;

      const obj = {
        // 'email': data.email,
        'name': data.name,
        'username': data.username
      }

      // send request
      await axios.put(accountUpdateApi, obj)
        .then( response => {
          // this handles to update authuser state and cookie
          handleUpdateAuthUser(response.data.user)

          // update context to re-render associate component
          handleSetIsAccountUpdated();          

          handleCloseModal();
          handleCloseForm();

          // notification
          handleSetNotification(response.data.message);
        })
      
    } catch(err) {
      setErrors(err.response.data.errors)
    }
  };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Edit account</div>

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

        {/* <Controller 
          name="email"
          as={
            <div className="formInputWrap">
              <TextField 
                id="email" 
                name="email"
                label="Email" 
                variant="filled"
                defaultValue={ authenticatedUser.email }
                />
            </div>
          }
          control={control}
          defaultValue={ authenticatedUser.email }
        /> */}

        <Controller 
          name="name"
          as={
            <div className="formInputWrap">
              <TextField 
                id="name" 
                name="name"
                label="Name" 
                variant="filled"
                defaultValue={ authenticatedUser.name }
                />
            </div>
          }
          control={control}
          defaultValue={ authenticatedUser.name }
        />

        <Controller 
          name="username"
          as={
            <div className="formInputWrap">
              <TextField 
                id="username" 
                name="username"
                label="Username" 
                variant="filled"
                defaultValue={ authenticatedUser.username }
                />
            </div>
          }
          control={control}
          defaultValue={ authenticatedUser.username }
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

export default EditProfile;