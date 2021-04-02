import { useState, createContext } from 'react';
import Cookies from 'js-cookie';
import Utils from '../Utils';
import axios from 'axios';
import config from './../config';

// set the type of state you want to handle with context e.g.
interface ContextState {
  userProfile: any;
  authenticatedUser: string | null;
  utils: any;
  actions: {
    signIn: Function;
    signOut: Function;
  }
}

interface IUser {
  _id: string;
  user_id: string;
  username: string;
  bio: string;
}  

export const UserContext = createContext({} as ContextState);

// export Provider
export const UserProvider: React.FC = (props) => {
  // state
  const [ userProfile, setUserProfile ] = useState(Cookies.getJSON('authenticatedUserProfile') || null);
  const [ authenticatedUser, setAuthenticatedUser ] = useState(Cookies.getJSON('authenticatedUser') || null);

  // get utils with object constructor. (Utils comes with 'createUser' and 'getUser' functions)
  const utils = new Utils();

  // get and set user profile to the state
  const handleSetProfile = async (user: {name: '', username: ''}) => {
    const username = user.username;
    const urlFeed = config.apiBaseUrl + '/profile/' + username;

    await axios.get(urlFeed)
      .then( response => {
        setUserProfile(response.data);
        Cookies.set('authenticatedUserProfile', JSON.stringify(response.data), { expires: 1 });
        // console.log(response.data);
      })
  }

  // signin
  const signIn = async (email: string, password: string) => {
    const user = await utils.getUser(email, password);

    if (user !== null){
      setAuthenticatedUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      // set user profile in state
      handleSetProfile(user);
    }

    return user;
  }

  // signout
  const signOut = () => {
    // empty out user
    setAuthenticatedUser(null);
    Cookies.remove('authenticatedUser');

    // empty out user profile
    setUserProfile(null)
    Cookies.remove('authenticatedUserProfile');
  };
 

  // value to pass to the provider
  const value = {
    userProfile,
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



