import { useState, useEffect } from 'react';
import { Route, Switch, useParams, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

// components
import Bikes from './Bikes';
import SingleBike from './SingleBike';
import Items from './Items';
import SingleItem from './SingleItem';

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

  // state
  const [user, setUser] = useState<IUser>({_id: "", user_id: "", username: "", bio: "", website: "", image: [{key: "", location: ""}]});


  // username params
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    (async() => {
      const profileApi = config.apiBaseUrl + '/profile/' + username;
      
      await axios.get(profileApi)
        .then( (response) => {     
          const userId = response.data.user_id;
          const profileApi = config.apiBaseUrl + '/' + userId + '/profile';

          axios.get(profileApi)
            .then( (response) => {
              setUser(response.data);
            });
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
                target="_blank" >{ user.website.replace(/^https?:\/\//i, "") }</a>
            </ScProfileWebsite>
          </ScProfileTxtArea>
        </ScProfile>
        :
        <Redirect to="/" />
      }

      <ul>
        <NavLink to={`/${ user.username }/bikes`}>Bikes</NavLink>
        <NavLink to={`/${ user.username }/items`}>Items</NavLink>
      </ul>

      <Switch>
        <Route exact path="/:username/bikes" component={ Bikes } />
        <Route path="/:username/bikes/:id" component={ SingleBike } />
        <Route exact path="/:username/items" component={ Items } />
        <Route path="/:username/items/:id" component={ SingleItem } />
        {/* <Route exact path="/:username/items" component={ MyItems } /> */}
          {/* <ItemList 
            items={ myBikes }
            route={ '/mybikes' } /> */}
      </Switch>

      {/* Send data to ItemList component */}
        {/* <ItemList 
          items={ myBikes }
          route={ '/mybikes' } /> */}
    </>
  )
}

export default UserProfile;