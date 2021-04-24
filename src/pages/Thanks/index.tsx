import React from 'react';
import { NavLink } from 'react-router-dom';


function Thanks(){

  return (
    <>
      <h2>Thanks for Signing up!</h2>
      <p>Please check your inbox.</p>
      <p>We sent you a confirmation email to you.</p>

      <NavLink to="/signin">Sign In</NavLink>
    </>
  )
}

export default Thanks;