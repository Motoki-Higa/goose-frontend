import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// components
import Header from '../Header/index';
import SignUp from '../SignUp/index';

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
          </Switch>

        </ScAppInner>
      </ScApp>
    </Router>
  );
}

export default App;
