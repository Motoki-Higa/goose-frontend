import { useState, createContext } from 'react';
import Cookies from 'js-cookie';
import Utils from './Utils';

// set the type of state you want to handle with context e.g.
interface ContextState {
  authenticatedUser: string | null;
  utils: any;
  actions: {
    signOut: Function;
  }
}

export const Context = createContext({} as ContextState);

export const Provider: React.FC = (props) => {
  // state
  const [ authenticatedUser, setAuthenticatedUser ] = useState(Cookies.getJSON('authenticatedUser') || null);

  // get utils with object constructor. (Utils comes with 'createUser' and 'getUser' functions)
  const utils = new Utils();

  // signout function
  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove('authenticatedUser');
  };

  // value to pass to the provider
  const value = {
    authenticatedUser,
    utils,
    actions: {
      signOut
    }
  };

  return (
    <Context.Provider value={ value }>
      { props.children }
    </Context.Provider>
  )
}



