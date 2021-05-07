import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

// contexts
import { UserContext } from '../../context/UserContext';
import { NotificationContext } from '../../context/NotificationContext';


function EmailChange(){
  // context
  const { authenticatedUser, handleUpdateAuthUser } = useContext<any>(UserContext);
  const { handleSetNotification } = useContext(NotificationContext);

  // state
  const [ message, setMessage ] = useState();

  // username params
  const { token } = useParams<{ token: string }>();

  let history = useHistory();
  const accountSettingUrl = `/${ authenticatedUser.username }/settings/account`;


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

            // redirect
            history.push(accountSettingUrl)
          })
        
      } catch(err) {
        setMessage(err.response.data.error);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {
        message ?
        <div className="formPanel">
          <h2 className="formTitle">{ message }</h2>
          <p className="formDesc">
            Email verification link is valid for 10min.<br />
            Please request it again.
          </p>
          <div className="formLinkTxt">
            <NavLink to={ accountSettingUrl }>Go to settings</NavLink>
          </div>
        </div>
        :
        null
      }
    </>
  )
}

export default EmailChange;