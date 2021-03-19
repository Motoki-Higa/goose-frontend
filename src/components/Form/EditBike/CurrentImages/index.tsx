import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from './../../../../config';
import { DeleteForever } from '@material-ui/icons';

// contexts
import { CurrentItemContext } from '../../../../context/CurrentItemContext';
import { FormContext } from '../../../../context/FormContext';
import { NotificationContext } from '../../../../context/NotificationContext';

function CurrentImages() {
  // context
  const { currentItem } = useContext(CurrentItemContext);
  const { setDetectAnyFormSubmit } = useContext(FormContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ previewImages, setPreviewImages] = useState([]);

  // delete an image from current image stack from DB and update the component state
  const handleDeleteImage = async (imageKey: string) => {
    try {
      // endpoint
      const id = await currentItem._id;
      const url = config.apiBaseUrl + '/mybikes/' + id + '/edit/image';

      // send request
      await axios.post(url, {'key': imageKey})
        .then( response => {
          console.log(response);
          // update state, and trigger the component to render
          setPreviewImages(previewImages.filter( item => item['key'] !== imageKey));
          setDetectAnyFormSubmit(true);
          setDetectAnyFormSubmit(); // *IMPORTANT reset to initial state after true

          // notification
          handleSetNotification(response.data.message);
        })
      
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setPreviewImages(currentItem.images)
  }, [currentItem.images])

  return (
    <>
    {
      previewImages.length !== 0 ? 
      <div className="formCurrentImgArea">
        <div className="formCurrentImgArea__ttl">Current images</div>
        <div className="formCurrentImgArea__inner">
        {
          previewImages.map( (image: any, index: number) => {
            return (
              <div 
                className="formPreviewImg"
                key={index}
                style={{
                  backgroundImage: `url( ${ image.location } )`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`
                  }} >

                <DeleteForever onClick={ () => handleDeleteImage(image.key) } />
              </div>
            )
          })    
        } 
        </div>
      </div>
      :
      null
    }
    </>
  )
}

export default CurrentImages;