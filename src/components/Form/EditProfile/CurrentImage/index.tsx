import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from './../../../../config';
import { DeleteForever } from '@material-ui/icons';

// contexts
import { UserContext } from '../../../../context/UserContext';
import { NotificationContext } from '../../../../context/NotificationContext';
import { ModalContext } from '../../../../context/ModalContext';
import { FormContext } from '../../../../context/FormContext';

function CurrentImages() {
  // context
  const { authUserProfile, handleSetIsProfileUpdated } = useContext(UserContext);
  const { handleSetNotification } = useContext(NotificationContext);
	const { handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);
	

	interface IPrevImg {
		key: string;
		location: string;
	}

  // state
  const [ previewImage, setPreviewImage] = useState<IPrevImg>({key: "", location: ""});

  // delete an image from current image stack from DB and update the component state
  const handleDeleteImage = async () => {
    try {
      // endpoint
      const url = config.apiBaseUrl + '/profile/' + authUserProfile.user_id + '/image/' + authUserProfile.image.key;

      // send request
      await axios.delete(url)
        .then( response => {
          console.log(response);
          // update state, and trigger the component to render
          setPreviewImage({key: "", location: ""});
          handleSetIsProfileUpdated();

					handleCloseModal();
          handleCloseForm();

          // notification
          handleSetNotification(response.data.message);
        })
      
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setPreviewImage(authUserProfile.image)
  }, [authUserProfile.image])

  return (
    <>
    {
      previewImage.location !== '' ? 
      <div className="formCurrentImgArea">
        <div className="formCurrentImgArea__ttl">Current images</div>
        <div className="formCurrentImgArea__inner">

              <div 
                className="formPreviewImg"
                style={{
                  backgroundImage: `url( ${ previewImage.location } )`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`
                  }} >

                <DeleteForever onClick={ handleDeleteImage } />
              </div>

        </div>
      </div>
      :
      null
    }
    </>
  )
}

export default CurrentImages;