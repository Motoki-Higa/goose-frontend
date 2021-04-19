import { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Utils from '../Utils';
import axios from 'axios';
import config from '../config';

// set the type of state you want to handle with context e.g.
interface ContextState {
  authenticatedUser: string | null;
  authUserProfile: any;
  authUserBookmark: any;
  isProfileUpdated: boolean;
  isAccountUpdated: boolean;
  handleBookmarkUpdate: Function;
  handleSetIsProfileUpdated: any;
  handleSetIsAccountUpdated: any;
  utils: any;
  actions: {
    signIn: Function;
    signOut: Function;
  }
}

export const UserContext = createContext({} as ContextState);

// export Provider
export const UserProvider: React.FC = (props) => {

  const profileObj = {
    _id: "", 
    user_id: "", 
    username: "", 
    bio: "", 
    website: "", 
    image: [{key: "", location: ""}]
  }


  // state
  const [ authenticatedUser, setAuthenticatedUser ] = useState(Cookies.getJSON('authenticatedUser') || null);
  const [ authUserProfile, setAuthUserProfile ] = useState(profileObj);
  const [ authUserBookmark, setAuthUserBookmark ] = useState<string[]>([])
  const [ isProfileUpdated, setIsProfileUpdated ] = useState(false);
  const [ isAccountUpdated, setIsAccountUpdated ] = useState(false);


  // handle bookmark update
  const handleBookmarkUpdate = (itemId: string, bookmarked: boolean | undefined) => {
    const bookmarkApi = config.apiBaseUrl + '/bookmark/bikes/' + itemId;
    const method = bookmarked ? 'DELETE' : 'POST';

    axios({
      method: method,
      url: bookmarkApi
    })
    .then(response => {

      if (method === 'POST'){
        // if POST, then push a new item(id) to array
        setAuthUserBookmark(prevArray => [...prevArray, response.data.id]);
      } else {
        // if GET, then remove the item(id) from array
        setAuthUserBookmark(prevArray => prevArray.filter(item => item !== response.data.id));
      }
      
    })
    
  }
  

  // this is used for re-rendering components by notifiying
  const handleSetIsProfileUpdated = () => {
    setIsProfileUpdated(true);
    setIsProfileUpdated(false);
  }

  // this is used for re-rendering components by notifiying
  const handleSetIsAccountUpdated = () => {
    setIsAccountUpdated(true);
    setIsAccountUpdated(false);
  }


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
    setAuthUserProfile(profileObj);
    setAuthUserBookmark([])
    Cookies.remove('authenticatedUser');
  };


  // set auth user's profile AND bookmark objects
  useEffect(() => {
    if (authenticatedUser){
      const profileApi = config.apiBaseUrl + '/profile/' + authenticatedUser.username;
      const bookmarkApi = config.apiBaseUrl + '/' + authenticatedUser._id + '/bookmark';

      // get profile by username
      const profile = axios.get(profileApi)
        .then( (response) => response.data)

      // get bookmark
      const bookmark = axios.get(bookmarkApi)
        .then( (response) => response.data)

      Promise.all([profile, bookmark])
        .then( response => {
          const [ profileObj, bookmarkObj ]: any = response

          setAuthUserProfile(profileObj);

          // this condition makes sure that it wont run for the new user who doesn't have bookmark object created yet
          if (bookmarkObj){
            setAuthUserBookmark(bookmarkObj.bike_ids);
          }
          
        })
    }
  },[authenticatedUser, isProfileUpdated])
 

  // value to pass to the provider
  const value = {
    authenticatedUser,
    authUserProfile,
    authUserBookmark,
    isProfileUpdated,
    isAccountUpdated,
    handleBookmarkUpdate,
    handleSetIsProfileUpdated,
    handleSetIsAccountUpdated,
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



