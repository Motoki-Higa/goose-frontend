import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function SignOut() {
  // initialize context for use
  const context = useContext(UserContext);
  // component calls signOut and updates state after render
  useEffect(() => context.actions.signOut())

  return (
    <Redirect to="/" />
  )
}
  
export default SignOut;