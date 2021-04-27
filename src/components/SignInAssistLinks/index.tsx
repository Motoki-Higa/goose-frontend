import { NavLink } from 'react-router-dom';

// styles
import {
  ScAssistBlock
} from './styles'

function SignInAssistLinks(){
  return (
    <ScAssistBlock>
      <div>
        <NavLink to="/password/reset/request">Forgot password?</NavLink>
      </div>
      <div>
        <NavLink to="/email/verify/request">Email not verified?</NavLink>
      </div>
    </ScAssistBlock>
  )
}

export default SignInAssistLinks;