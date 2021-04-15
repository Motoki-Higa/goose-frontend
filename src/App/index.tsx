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
import AccountProfile from '../pages/AccountProfile';
import Feed from '../pages/FeedAllBikes/index';
import FeedSingleBike from '../pages/FeedSingleBike/index';
import Bookmarks from '../pages/AccountProfile/Bookmarks/index';
import Modal from '../components/Modal';
import Form from '../components/Form';
import Notification from '../components/Notification';

// context
import { UserProvider } from '../context/UserContext';
import { ModalProvider } from '../context/ModalContext';
import { FormProvider } from '../context/FormContext';
import { CurrentItemProvider } from '../context/CurrentItemContext';
import { InfiniteScrollProvider } from '../context/InfiniteScrollContext';
import { NotificationProvider } from '../context/NotificationContext';
import { IsMyDashboardProvider } from '../context/IsMyDashboardContext';

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
                <InfiniteScrollProvider>

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
                        <PrivateRoute exact path="/feed/search" component={ Feed } />
                        <PrivateRoute path="/feed/:id" component={ FeedSingleBike } />

                        <PrivateRoute path="/bookmarks" component={ Bookmarks } />

                        <IsMyDashboardProvider>
                          <PrivateRoute path="/:username" component={ AccountProfile } />
                        </IsMyDashboardProvider>
                      </Switch>
                    </div>

                    {/* notification */}
                    <Notification></Notification>

                  </div>

                </InfiniteScrollProvider>
              </NotificationProvider>
            </FormProvider>
          </ModalProvider>
        </CurrentItemProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
