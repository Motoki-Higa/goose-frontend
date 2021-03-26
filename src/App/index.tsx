import React from 'react';
import {
  BrowserRouter as Router, // BrowserRouter uses the HTML5 History API to keep your UI in sync with the URL
  Route,
  Switch
} from 'react-router-dom';

// components
import Header from '../components/Header/index';
import Nav from '../components/Nav/index';
import Home from '../pages/Home/index';
import SignUp from '../pages/SignUp/index';
import SignIn from '../pages/SignIn/index';
import SignOut from '../pages/SignOut/index';
import Feed from '../pages/FeedAllBikes/index';
import FeedSingleBike from '../pages/FeedSingleBike/index';
import MyBikes from '../pages/MyBikes/index';
import MyBike from '../pages/MyBike/index';
import MyItems from '../pages/MyItems/index';
import MyItem from '../pages/MyItem/index';
import Authenticated from '../pages/Authenticated/index';
import Modal from '../components/Modal';
import Form from '../components/Form';
import Notification from '../components/Notification';

// context
import { UserProvider } from '../context/UserContext';
import { ModalProvider } from '../context/ModalContext';
import { FormProvider } from '../context/FormContext';
import { CurrentItemProvider } from '../context/CurrentItemContext';
import { NotificationProvider } from '../context/NotificationContext';

// private route with context
import { PrivateRoute } from '../PrivateRoute';

// style
import {
  GlobalStyle,
} from './styles';




function App() {
  return (
    <Router>
      <GlobalStyle />
      <UserProvider>
        <CurrentItemProvider>
          <ModalProvider>
            <FormProvider>
              <NotificationProvider>

                <div className="App">
                  {/* modal */}
                  <Modal>
                    <Form></Form>
                  </Modal>
                  
                  {/* header */}
                  <Header></Header>

                  {/* nav */}
                  <Nav></Nav>
                  
                  {/* body */}
                  <div className="AppInner">
                    <Switch>
                      <Route exact path="/" component={ Home } />
                      <Route path="/signup" component={ SignUp } />
                      <Route path="/signin" component={ SignIn } />
                      <Route path="/signout" component={ SignOut } />
                      <PrivateRoute exact path="/feed" component={ Feed } />
                      <PrivateRoute path="/feed/:id" component={ FeedSingleBike } />
                      <PrivateRoute exact path="/mybikes" component={ MyBikes } />
                      <PrivateRoute path="/mybikes/:id" component={ MyBike } />
                      <PrivateRoute exact path="/myitems" component={ MyItems } />
                      <PrivateRoute path="/myitems/:id" component={ MyItem } />
                      <PrivateRoute path="/authenticated" component={ Authenticated } />
                    </Switch>
                  </div>

                  {/* notification */}
                  <Notification></Notification>

                </div>

              </NotificationProvider>
            </FormProvider>
          </ModalProvider>
        </CurrentItemProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
