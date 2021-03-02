import { useState, createContext } from 'react';
import Cookies from 'js-cookie';
import Utils from './Utils';

// set the type of state you want to handle with context e.g.
interface ContextState {
  authenticatedUser: string | null;
  utils: any;
  actions: {
    signIn: Function;
    signOut: Function;
  }
}

export const Context = createContext({} as ContextState);

// export Provider
export const Provider: React.FC = (props) => {
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
    <Context.Provider value={ value }>
      { props.children }
    </Context.Provider>
  )
}

// export Consumer
export const Consumer = Context.Consumer;



