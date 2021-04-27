import React, { useContext, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

// contexts
import { UserContext } from '../../context/UserContext';
import { NotificationContext } from '../../context/NotificationContext';


function EmailChange(){
  // context
  const { authenticatedUser, handleUpdateAuthUser } = useContext<any>(UserContext);
  const { handleSetNotification } = useContext(NotificationContext);


  // username params
  const { token } = useParams<{ token: string }>();


  useEffect(() => {
    (async() => {
      try {
        const userId = authenticatedUser._id;
        // endpoint
        const emailChangeApi = config.apiBaseUrl + '/users/' + userId + '/email/change/' + token;
  
        // send request
        await axios.put(emailChangeApi)
          .then( response => {
            // this handles to update authuser state and cookie
            handleUpdateAuthUser(response.data.user)

            // notification
            handleSetNotification(response.data.message);
          })
        
      } catch(err) {
        console.log(err)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <Redirect to={`/${authenticatedUser.username}/settings/account`} />
  )
}

export default EmailChange;