import React, { useContext, useState, useEffect } from 'react';
import { Redirect, NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

// context
import { UserContext } from '../../context/UserContext';

function VerifyEmail (){
  // state
  const [ isVerified, setIsVerified ] = useState(false);
  const [ message, setMessage ] = useState();

  // contenxt
  const { authenticatedUser } = useContext<any>(UserContext);

  // username params
  const { accesstoken } = useParams<{ accesstoken: string }>();

  useEffect(() => {
    (async () => {
      const verifyEmailApi =  config.apiBaseUrl + '/verify/' + accesstoken;
  
      await axios.get(verifyEmailApi)
        .then( response => {
          setMessage(response.data.message);
          setIsVerified(true);
        })
        .catch( err => {
          setMessage(err.response.data.error);
        })
  
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      { // if signed in already, then redirect to /feed
        authenticatedUser ?
        <Redirect to="/feed"></Redirect>
        :
        <>
          <div>Verify Email</div>

          { // if verified, show /signin, otherwise /token
            isVerified ? 
            <div>
              <p>{ message }</p>
              <NavLink to="/signin">Sign In</NavLink>
            </div>
            :
            <div>
              <p>{ message }</p>
              <p>Your verification link might be expired, please verify your email from below again.</p>
              <NavLink to="/signin">Send verification email again</NavLink>
            </div>
          }
        </>
      }
    </>
  )
}

export default VerifyEmail;