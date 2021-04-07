import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

// components
import ItemList from '../../components/ItemList';

// styles
import {
  ScProfile,
  ScProfileImg,
  ScProfileTxtArea,
  ScProfileName,
  ScProfileBio,
  ScProfileWebsite
} from './styles';

function UserProfile(){

  interface IUser {
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

  interface IMyBikes {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
  }

  // state
  const [user, setUser] = useState<IUser>({_id: "", user_id: "", username: "", bio: "", website: "", image: [{key: "", location: ""}]});
  // state : mybikes
  const [ myBikes, setMyBikes ] = useState<IMyBikes[]>([]);

  // username params
  const { username } = useParams<{ username: string }>();


  useEffect(() => {
    (async() => {
      const profileApi = config.apiBaseUrl + '/profile/' + username;
      const mybikesApi = config.apiBaseUrl + '/mybikes';

      async function getProfile(){
        return await axios.get(profileApi)
          .then( (response) => {          
            return response.data;
          });
      }

      async function getMyBikes(){
        return await axios.get(mybikesApi)
          .then( (response) => {
            return response.data.reverse()
            
          });
      }


      Promise.all([getProfile(), getMyBikes()])
        .then( response => {
          const [ profileData, myBikesData ] = response;

          setUser(profileData);
          setMyBikes(myBikesData);
        })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {
        user ? 
        <ScProfile>
          <ScProfileImg 
            style={{
              backgroundImage: `url( ${user.image[0].location} )`,
              backgroundSize: `cover`,
              backgroundPosition: `center`
              }}
          />

          <ScProfileTxtArea>
            <ScProfileName>{ user.username }</ScProfileName>
            <ScProfileBio>{ user.bio }</ScProfileBio>
            <ScProfileWebsite>
              <a 
                href={ user.website }
                rel="noreferrer"
                target="_blank" >{ user.website.replace(/^https?\:\/\//i, "") }</a>
            </ScProfileWebsite>
          </ScProfileTxtArea>
        </ScProfile>
        :
        <Redirect to="/" />
      }

      {/* Send data to ItemList component */}
        <ItemList 
          items={ myBikes }
          route={ '/mybikes' } />
    </>
  )
}

export default UserProfile;