import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

function UserProfile(){

  interface IUser {
    _id: string;
    user_id: string;
    username: string;
    bio: string;
  }

  // state
  const [user, setUser] = useState<IUser>({_id: "", user_id: "", username: "", bio: "", });

  // username params
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    (async() => {
      const url = config.apiBaseUrl + '/profile/' + username;

      await axios.get(url)
        .then( (response) => {          
          setUser(response.data);
        });
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    {
      user ? 
      <div>
        User Profile
        <h1>{ user.username }</h1>
        <p>{ user.bio }</p>
      </div>
      :
      <Redirect to="/" />
    }
    </>
  )
}

export default UserProfile;