import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ReactComponent as Logo } from './../../assets/goose-logo.svg';

import { 
  ScHeader, 
  ScLogo, 
  ScAccountBlock,
  ScUsername, 
  ScAccountCircle,
  ScLink,
} from './styles';

const Header: React.FC = () => {
  // initialize context for use
  const context = useContext(UserContext);
  const authUser: any = context.authenticatedUser;

  return (
    <ScHeader>
      <ScLogo>
        <Logo></Logo>
      </ScLogo>
    
      {
        authUser ?
        <ScAccountBlock>
          <ScLink to="/signout">Sign Out</ScLink>
          <ScUsername>{ authUser.name }</ScUsername>
          <ScAccountCircle></ScAccountCircle>   
        </ScAccountBlock>
      :
        <ScAccountBlock>
          <ScLink to="/signin">Sign In</ScLink>
          <ScLink to="/signup">Sign Up</ScLink>   
        </ScAccountBlock>
      }
      
    </ScHeader>  
  )
}

export default Header