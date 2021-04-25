import React from 'react';
import { NavLink } from 'react-router-dom';


function Thanks(){

  return (
    <div className="formPanel">
      <h2 className="formTitle">Please verify your email</h2>
      <p className="formDesc">
        Thanks for signing up!<br />
        We sent you a confirmation email to you.<br />
        Please check your inbox.
      </p>
    </div>
  )
}

export default Thanks;