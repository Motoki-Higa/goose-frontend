import { NavLink } from 'react-router-dom';

// styles
import {
  ScAssistBlock
} from './styles'

function SignInAssistLinks(){
  return (
    <ScAssistBlock>
      <div>
        <NavLink to="/signin">Forgot password?</NavLink>
      </div>
      <div>
        <NavLink to="/request-verify-email">Email not verified?</NavLink>
      </div>
    </ScAssistBlock>
  )
}

export default SignInAssistLinks;