import { useEffect, useContext } from 'react';
import { Route, Switch, useParams, Redirect, NavLink } from 'react-router-dom';
import { Album, Category } from '@material-ui/icons';

// context
import { UserContext } from '../../context/UserContext';
import { IsMyAccount } from '../../context/IsMyAccountContext';

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


function AccountDashboard(){
  // contenxt
  const { authUserProfile, isProfileUpdated, authenticatedUser } = useContext<any>(UserContext);
  const { isMyAccount, handleSetIsMyAccount } = useContext(IsMyAccount);

  // username params
  const { username } = useParams<{ username: string }>();


  useEffect(() => {
    // check if it's your own dashboard
    if(authenticatedUser.username === username){
      handleSetIsMyAccount(true);
    } else {
      handleSetIsMyAccount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username, isProfileUpdated])


  return (
    <>
      <h1 className="Title">Dashboard</h1>
      {
        authUserProfile ? 
        <ScProfile>
          <ScProfileImg 
            style={{backgroundImage:`url(${ authUserProfile.image ? authUserProfile.image.location : null})`}}/>

          <ScProfileTxtArea>
            <ScProfileName>{ authUserProfile.username }</ScProfileName>
            <ScProfileBio>{ authUserProfile.bio }</ScProfileBio>
            <ScProfileWebsite>
              <a 
                href={ authUserProfile.website }
                rel="noreferrer"
                target="_blank" >{ authUserProfile.website.replace(/^https?:\/\//i, "") }</a>
            </ScProfileWebsite>
          </ScProfileTxtArea>
        </ScProfile>
        :
        <Redirect to="/" />
      }

      {/* sub nav */}
      <ScSubNav>
        <NavLink to={`/${ authUserProfile.username }/dashboard/bikes`}>
          <Album></Album>
          <p>Bikes</p>
        </NavLink>

        {
          isMyAccount ?
          <NavLink to={`/${ authUserProfile.username }/dashboard/items`}>
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