import { useState, useEffect, useContext } from 'react';
import { Route, Switch, useParams, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Album, Category } from '@material-ui/icons';

// context
import { UserContext } from '../../context/UserContext';
import { IsMyDashboard } from '../../context/IsMyDashboardContext';

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
  ScProfileWebsite,
  ScSubNav
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

  // contenxt
  const { authenticatedUser } = useContext<any>(UserContext);
  const { isMyDashboard, handleSetIsMyDashboard } = useContext(IsMyDashboard);

  // username params
  const { username } = useParams<{ username: string }>();


  useEffect(() => {
    (async() => {
      // check if it's your own dashboard
      if(authenticatedUser.username === username){
        handleSetIsMyDashboard(true);
      } else {
        handleSetIsMyDashboard(false);
      }

      const profileApi = config.apiBaseUrl + '/profile/' + username;

      // get profile by username
      await axios.get(profileApi)
        .then( (response) => {     
          setUser(response.data);
        })
          
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username])


  return (
    <>
      {
        user ? 
        <ScProfile>
          <ScProfileImg 
            style={{backgroundImage:`url(${ user.image[0] ? user.image[0].location : null})`}}/>

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

      {/* sub nav */}
      <ScSubNav>
        <NavLink to={`/${ user.username }/bikes`}>
          <Album></Album>
          <p>Bikes</p>
        </NavLink>

        {
          isMyDashboard ?
          <NavLink to={`/${ user.username }/items`}>
            <Category></Category>
            <p>Items</p>
          </NavLink>
          :
          null
        }
      </ScSubNav>

      {/* components */}
      <Switch>
        <Route exact path="/:username/bikes" component={ Bikes } />
        <Route exact path="/:username/bikes/search" component={ Bikes } />
        <Route path="/:username/bikes/:id" component={ SingleBike } />
        <Route exact path="/:username/items" component={ Items } />
        <Route exact path="/:username/items/search" component={ Items } />
        <Route path="/:username/items/:id" component={ SingleItem } />
      </Switch>
    </>
  )
}

export default UserProfile;