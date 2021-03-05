import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../Context';

function SignOut() {
  // initialize context for use
  const context = useContext(Context);
  // component calls signOut and updates state after render
  useEffect(() => context.actions.signOut())

  return (
    <Redirect to="/" />
  )
}
  
export default SignOut;