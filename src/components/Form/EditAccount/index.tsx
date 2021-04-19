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


function EditProfile(){
  // context
  const { authenticatedUser, handleSetIsAccountUpdated } = useContext<any>(UserContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // form
  const { control, register, handleSubmit, formState } = useForm();
  const { isDirty } = formState;


  // submit
  // const onSubmit = async (data: any) => {
  //   try {
  //     // endpoint
  //     const profileId = authenticatedUser._id;
  //     const profileUpdateApi = config.apiBaseUrl + '/profile/' + profileId + '/edit';

  //     // construct a set of key/value pairs by js FormData() *FormDate() is important and useful
  //     const formData: any = new FormData();
  //     formData.append('bio', data.bio);
  //     formData.append('website', data.website);

  //     // send request
  //     await axios.post(profileUpdateApi, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // 'multipart/form-data' for text and image values together
  //       },
  //     })
  //       .then( response => {
  //         // update context to re-render associate component
  //         handleSetIsProfileUpdated();

  //         handleCloseModal();
  //         handleCloseForm();

  //         // notification
  //         handleSetNotification(response.data.message);
  //       })
      
  //   } catch(err) {
  //     console.log(err)
  //   }
  // };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Edit account</div>

      <form 
        className="form" 
        // onSubmit={ handleSubmit(onSubmit) }
        >

        <Controller 
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