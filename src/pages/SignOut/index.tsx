import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function SignOut() {
  // context
  const context = useContext(UserContext);

  useEffect(() => context.actions.signOut())

  return (
    <Redirect to="/" />
  )
}
  
export default SignOut;