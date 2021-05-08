import { useState, useEffect, useContext } from 'react';
import { Route, Switch, useParams, Redirect, NavLink } from 'react-router-dom';
import { Album, Category } from '@material-ui/icons';
import axios from 'axios';
import config from '../../config';

// context
import { UserContext } from '../../context/UserContext';
import { IsMyAccount } from '../../context/IsMyAccountContext';

// components
import Bikes from './Bikes';
import SingleBike from './SingleBike';
import Items from './Items';
import SingleItem from './SingleItem';
import FollowBtn from './../../components/buttons/Followbtn'

// styles
import {
  ScProfile,
  ScLeftColumn,
  ScProfileImg,
  ScProfileTxtArea,
  ScProfileName,
  ScProfileBio,
  ScProfileWebsite,
  ScSubNav
} from './styles';


function AccountDashboard(){
  interface IProfile {
    _id: string;
    user_id: string;
    username: string;
    bio: string;
    website: string;
    image: {
      key: string;
      location: string;
    };
  }

  // state
  const [ userData, setUserData ] = useState<IProfile>({
    _id: '',
    user_id: '',
    username: '',
    bio: '',
    website: '',
    image: {
      key: '',
      location: '',
    },
  });

  // contenxt
  const { authUserProfile, isProfileUpdated, authenticatedUser } = useContext<any>(UserContext);
  const { isMyAccount, handleSetIsMyAccount } = useContext(IsMyAccount);

  // username params
  const { username } = useParams<{ username: string }>();


  useEffect(() => {
    // check if it's your own dashboard
    if(authenticatedUser.username === username){
      handleSetIsMyAccount(true);
      setUserData(authUserProfile)
      
    } else {
      const userApi = config.apiBaseUrl + '/profile/' + username;

      axios.get(userApi)
        .then(response => {
          setUserData(response.data);
        })
      handleSetIsMyAccount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username, isProfileUpdated, authUserProfile])


  return (
    <>
      <h1 className="Title">Dashboard</h1>
      {
        userData ? 
        <ScProfile>
          <ScLeftColumn>
            <ScProfileImg 
              style={{backgroundImage:`url(${ userData.image ? userData.image.location : null})`}}/>

            { // show follow btn if not own dashboard
              !isMyAccount ?
              <FollowBtn userId={ userData.user_id }></FollowBtn>
              :
              null
            }
            
          </ScLeftColumn>

          <ScProfileTxtArea>
            <ScProfileName>{ userData.username }</ScProfileName>
            <ScProfileBio>{ userData.bio }</ScProfileBio>
            <ScProfileWebsite>
              <a 
                href={ userData.website }
                rel="noreferrer"
                target="_blank" >{ userData.website.replace(/^https?:\/\//i, "") }</a>
            </ScProfileWebsite>
          </ScProfileTxtArea>
        </ScProfile>
        :
        <Redirect to="/" />
      }

      {/* sub nav */}
      <ScSubNav>
        <NavLink to={`/${ userData.username }/dashboard/bikes`}>
          <Album></Album>
          <p>Bikes</p>
        </NavLink>

        {
          isMyAccount ?
          <NavLink to={`/${ userData.username }/dashboard/items`}>
            <Category></Category>
            <p>Items</p>
          </NavLink>
          :
          null
        }
      </ScSubNav>

      {/* components */}
      <Switch>
        {/* /dashboard/bikes */}
        <Route exact path="/:username/dashboard/bikes" component={ Bikes } />
        <Route exact path="/:username/dashboard/bikes/search" component={ Bikes } />
        <Route path="/:username/dashboard/bikes/:id" component={ SingleBike } />
        {/* /dashboard/imtes */}
        <Route exact path="/:username/dashboard/items" component={ Items } />
        <Route exact path="/:username/dashboard/items/search" component={ Items } />
        <Route path="/:username/dashboard/items/:id" component={ SingleItem } />
        {/* /settings */}
      </Switch>
    </>
  )
}

export default AccountDashboard;