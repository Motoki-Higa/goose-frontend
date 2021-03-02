import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// context
import { Provider } from './../../Context';

// components
import Header from '../Header/index';
import SignUp from '../SignUp/index';
import SignIn from '../SignIn/index';

// style
import {
  GlobalStyle,
  ScApp,
  ScAppInner
} from './styles';



function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScApp className="App">
        <Header></Header>

        <ScAppInner>

          <Switch>
            <Route exact path="/" component={ SignUp } />

            <Provider>
              <Route path="/signup" component={ SignUp } />
              <Route path="/signin" component={ SignIn } />
            </Provider>

          </Switch>

        </ScAppInner>
      </ScApp>
    </Router>
  );
}

export default App;
