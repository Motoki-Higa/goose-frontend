import { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Utils from '../Utils';
import axios from 'axios';
import config from '../config';

// set the type of state you want to handle with context e.g.
interface ContextState {
  isProfileUpdated: boolean;
  handleSetIsProfileUpdated: any;
  authenticatedUser: string | null;
  authUserProfile: any;
  utils: any;
  actions: {
    signIn: Function;
    signOut: Function;
  }
}

export const UserContext = createContext({} as ContextState);

// export Provider
export const UserProvider: React.FC = (props) => {

  interface IAuthUserProfile {
    _id: string;
    user_id: string;
    username: string;
    bio: string;
    website: string;
    image:[{
      key: string;
      location: string;
    }]
  }

  // state
  const [ isProfileUpdated, setIsProfileUpdated ] = useState(false);
  const [ authenticatedUser, setAuthenticatedUser ] = useState(Cookies.getJSON('authenticatedUser') || null);
  const [ authUserProfile, setAuthUserProfile ] = useState<IAuthUserProfile>({_id: "", user_id: "", username: "", bio: "", website: "", image: [{key: "", location: ""}]});

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


  const handleSetIsProfileUpdated = () => {
    setIsProfileUpdated(true);
    setIsProfileUpdated(false);
  }


  // set authenticated user's profile
  useEffect(() => {
    if (authenticatedUser){
      const profileApi = config.apiBaseUrl + '/profile/' + authenticatedUser.username;

      // get profile by username
      axios.get(profileApi)
        .then( (response) => {
          setAuthUserProfile(response.data);
        })
    }
  },[authenticatedUser, isProfileUpdated])
 

  // value to pass to the provider
  const value = {
    isProfileUpdated,
    handleSetIsProfileUpdated,
    authenticatedUser,
    authUserProfile,
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



