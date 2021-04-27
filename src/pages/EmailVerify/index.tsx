import React, { useContext, useState, useEffect } from 'react';
import { Redirect, NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

// context
import { UserContext } from '../../context/UserContext';

function EmailVerify(){
  // state
  const [ isVerified, setIsVerified ] = useState(false);
  const [ message, setMessage ] = useState();

  // contenxt
  const { authenticatedUser } = useContext<any>(UserContext);

  // username params
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    (async () => {
      const verifyEmailApi =  config.apiBaseUrl + '/users/email/verify/' + token;
  
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
    <div className="formPanel">
      { // if signed in already, then redirect to /feed
        authenticatedUser ?
        <Redirect to="/feed"></Redirect>
        :
        <>
          { // if verified, show /signin, otherwise /token
            isVerified ? 
            <div>
              <h2 className="formTitle">Email confirmed</h2>
              <p className="formDesc">
                Thanks for signing up!<br />
                { message }
              </p>

              <div className="formLinkTxt">
                <NavLink to="/signin">Sign In</NavLink>
              </div>
            </div>
            :
            <div>
              <h2 className="formTitle formTitle--error">{ message }</h2>
              <p className="formDesc">
                Shoot! Your verification link might be expired. <br />
                Please verify your email from below again.
              </p>

              <div className="formLinkTxt">
                <NavLink to="/email/verify/request">Re-send verification email</NavLink>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}

export default EmailVerify;