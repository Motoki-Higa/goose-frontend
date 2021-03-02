import { useContext } from 'react';
import { Context } from './../../Context';

function Authenticated() {
  // initialize context for use
  const context = useContext(Context);

  const authUser: any = context.authenticatedUser;

  return (
    <div>
      <div>
        <h1>{authUser.name} is authenticated!</h1>
        <p>Your username is {authUser.username}.</p>
      </div>
    </div>
  )
}

export default Authenticated;