import { useState, createContext } from 'react';
import Cookies from 'js-cookie';
import Utils from '../Utils';

// set the type of state you want to handle with context e.g.
interface ContextState {
  authenticatedUser: string | null;
  utils: any;
  actions: {
    signIn: Function;
    signOut: Function;
  }
}

export const UserContext = createContext({} as ContextState);

// export Provider
export const UserProvider: React.FC = (props) => {
  // state
  const [ authenticatedUser, setAuthenticatedUser ] = useState(Cookies.getJSON('authenticatedUser') || null);

  // get utils with object constructor. (Utils comes with 'createUser' and 'getUser' functions)
  const utils = new Utils();

  // signin
  const signIn = async (email: string, password: string) => {
    const user = await utils.getUser(email, password);

    if (user !== null){
      setAuthenticatedUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  // signout
  const signOut = () => {
    // empty out user
    setAuthenticatedUser(null);
    Cookies.remove('authenticatedUser');
  };
 

  // value to pass to the provider
  const value = {
    authenticatedUser,
    utils,
    actions: {
      signIn,
      signOut
    }
  };

  return (
    <UserContext.Provider value={ value }>
      { props.children }
    </UserContext.Provider>
  )
}

// export Consumer : this is only used for PrivateRoute.tsx
export const UserConsumer = UserContext.Consumer;



