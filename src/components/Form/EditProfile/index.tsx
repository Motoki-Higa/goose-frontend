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

// components
import CurrentImage from './CurrentImage';


function EditProfile(){
  // context
  const { authUserProfile, handleSetIsProfileUpdated } = useContext(UserContext);
  const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // form
  const { control, register, handleSubmit, formState } = useForm();
  const { isDirty } = formState;

  // state for preview image (display purpose)
  const [ preview, setPreview ] = useState<any>();
  // state for image to be used for api request call
  const [ profileImage, setProfileImage ] = useState<string>('');


  // Store image URIs to its state for preview purpose
  const readURI = (event: any) => {
    // Get files and store in array
    const file = event.target.files[0];

    // Map each file to a promise that resolves to an array of image URI's
    new Promise( (resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        resolve(event.target.result);
      })
      reader.addEventListener('error', reject);
      reader.readAsDataURL(file);
    })
    .then(preview => {
      setPreview(preview);
    }, error => {        
      console.error(error);
    });
  }

  // handle preview image and state onChange
  const handleChange = (event: any) => {
    // preview image update
    readURI(event);
    // set image state
    setProfileImage(event.target.files[0]);
  }


  // submit
  const onSubmit = async (data: any) => {
    try {
      // endpoint
      const profileId = authUserProfile._id;
      const profileUpdateApi = config.apiBaseUrl + '/profile/' + profileId + '/edit';

      // construct a set of key/value pairs by js FormData() *FormDate() is important and useful
      const formData: any = new FormData();
      formData.append('bio', data.bio);
      formData.append('website', data.website);
      formData.append('image', profileImage);

      // if updating the profile image AND old profile image exists
      // then send old image's key to BE for file delete from aws
      if (profileImage && authUserProfile.image.key !== ''){
        formData.append('prevImageKey', authUserProfile.image.key);
      }

      // send request
      await axios.post(profileUpdateApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 'multipart/form-data' for text and image values together
        },
      })
        .then( response => {
          // update context to re-render associate component
          handleSetIsProfileUpdated();

          handleCloseModal();
          handleCloseForm();

          // notification
          handleSetNotification(response.data.message);
        })
      
    } catch(err) {
      console.log(err)
    }
  };


  return (
    <div className="formPanel formPanel--modal">
      <div className="formTitle">Edit profile</div>

      {/* form 1: this handles deleting current images */}
      <CurrentImage></CurrentImage>

      {/* form 2: this handles new entries include images */}
      <div className="formEditArea">
        <div className="formCurrentImgArea__ttl">Edit fields / Change image</div>

        <form 
          className="form" 
          onSubmit={ handleSubmit(onSubmit) }
          >

          {/* add image button */}
          <div className="formImageAddBtnWrap">
            <label htmlFor="image" >
              <Button 
                variant="contained" 
                component="span"
                size="small">
                  Change profile image
              </Button>
            </label>
            <input 
              style={{ display: "none" }}
              ref={ register } 
              type="file" 
              id="image" 
              name="image" 
              onChange={ handleChange } />
          </div>

          { // show preview images
            profileImage.length !== 0 ? 
            <div className="formPreviewImgArea">
              <div 
                className="formPreviewImg"
                style={{
                  backgroundImage: `url( ${ preview } )`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`
                  }} >

              </div>
            </div>
            :
            null
          }

          <Controller 
            name="bio"
            as={
              <div className="formInputWrap">
                <TextField 
                  id="bio" 
                  name="bio"
                  multiline
                  rows={3}
                  rowsMax={4}
                  label="Biography" 
                  variant="filled"
                  defaultValue={ authUserProfile.bio }
                  />
              </div>
            }
            control={control}
            defaultValue={ authUserProfile.bio }
          />

          <Controller 
            name="website"
            as={
              <div className="formInputWrap">
                <TextField 
                  id="website" 
                  name="website"
                  label="Website URL" 
                  variant="filled"
                  defaultValue={ authUserProfile.website }
                  />
              </div>
            }
            control={control}
            defaultValue={ authUserProfile.website }
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
      
    </div>
  )
}

export default EditProfile;