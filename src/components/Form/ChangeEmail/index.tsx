import React, { useState, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';
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


function EditEmail(){
  // context
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ errors, setErrors ] = useState<string[]>([])

  // form
  const { control, handleSubmit, formState } = useForm();
  const { isDirty } = formState;

  let history = useHistory();

  // submit
  const onSubmit = async (data: any) => {
    try {
      const userId = authenticatedUser._id;
      // endpoint
      const emailChangeApi = config.apiBaseUrl + '/users/' + userId + '/email/change/request';

      const obj = {
        'newEmail': data.newEmail
      }

      // send request
      await axios.put(emailChangeApi, obj)
        .then( response => {
          handleCloseModal();
          handleCloseForm();

          history.push('/thanks');

          // notification
          handleSetNotification(response.data.message);
        })
      
    } catch(err) {
      setErrors(err.response.data.errors)
    }
  };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Change Email</div>

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
          name="newEmail"
          as={
            <div className="formInputWrap">
              <TextField 
                id="newEmail" 
                name="newEmail"
                label="Email" 
                variant="filled"
                defaultValue={ authenticatedUser.email }
                />
            </div>
          }
          control={control}
          defaultValue={ authenticatedUser.email }
        />

        {/* submit */}
        <div className="formBtnWrap">
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled={ !isDirty }>Change Email</Button>
        </div>

      </form>
    </div> 
  )
}

export default EditEmail;