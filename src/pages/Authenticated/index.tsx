import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function Authenticated() {
  // initialize context for use
  const context = useContext(UserContext);

  const authUser: any = context.authenticatedUser;

  return (
    <div>
      <div>
        <h1>{authUser.name} is authenticated!</h1>
      </div>
    </div>
  )
}

export default Authenticated;