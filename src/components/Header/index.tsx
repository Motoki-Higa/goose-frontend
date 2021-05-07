import React, { useContext } from 'react';
import AccountThumb from './AccountThumb';
import { ReactComponent as Logo } from './../../assets/goose-logo.svg';

// contexts
import { UserContext } from '../../context/UserContext';

// style
import { 
  ScHeader, 
  ScLogo, 
  ScAccountBlock,
  ScUsername,
  ScLink,
} from './styles';

const Header: React.FC = () => {
  // context
  const { authenticatedUser } = useContext<any>(UserContext);


  return (
    <ScHeader>
      <ScLogo to="/">
        <Logo></Logo>
      </ScLogo>
    
      {
        authenticatedUser ?
        <ScAccountBlock>
          <ScUsername>{ authenticatedUser.username }</ScUsername>
          <AccountThumb />
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