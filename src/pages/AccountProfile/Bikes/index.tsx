import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

// contexts
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';
import { IsMyDashboard } from '../../../context/IsMyDashboardContext';

// components
import AddBtn from '../../../components/buttons/AddBtn';
import SearchBar from '../../../components/SearchBar';
import ItemList from '../../../components/ItemList';

// styles
import {
  ScUtils,
  ScUtilsInner,
  ScUtilsCounter
} from './styles';


function Bikes() {

  interface IBikes {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
  }

  // state : bikes
  const [ bikes, setBikes ] = useState<IBikes[]>([]);
  
  // context to use
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleModal, handleCloseModal } = useContext(ModalContext);
  const { handleSetForm, handleCloseForm, detectAnyFormSubmit } = useContext(FormContext);
  const { isMyDashboard } = useContext(IsMyDashboard);

  // username params
  const { username } = useParams<{ username: string }>();

  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('q');

  // for search
  const handleSearch = async (data: any) => {
    history.push('/' + username + '/bikes/search?q=' + data.search);
  }

  // AddBtn onClick event
  const handleModalForm = () => {
    handleModal();
    handleSetForm('AddBike');
  }

  // close the modal and form on browser back
  useEffect( () => {
    window.onpopstate = () => {
      handleCloseModal();
      handleCloseForm();
    }
  }) 

  // api call to get bikes
  useEffect( () => {
      const profileApi = config.apiBaseUrl + '/profile/' + username;

      axios.get(profileApi)
        .then( response => {     
          const userId = response.data.user_id;
          let bikesApi = '';

          // if visiting your own dashboard, then call myBikes api, otherwise bikes api
          if (authenticatedUser.username === username){
            if (query){
              bikesApi = config.apiBaseUrl + '/' + userId + '/myBikes/search?q=' + query;
            } else {
              bikesApi = config.apiBaseUrl + '/' + userId + '/myBikes';
            }
          } else {
            if (query){
              bikesApi = config.apiBaseUrl + '/' + userId + '/bikes/search?q=' + query;
            } else {
              bikesApi = config.apiBaseUrl + '/' + userId + '/bikes';
            }
          }

          axios.get(bikesApi)
            .then( (response) => {
              setBikes(response.data.reverse());
            });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectAnyFormSubmit, username, query]) // detectAnyFormSubmit makes sure to re-render useEffect


  return (
    <>
      {/* utility bar: AddBtn & SearchBar & Total number */}
      <ScUtils>
        <ScUtilsInner>
          {
            isMyDashboard ?
            <div onClick={ handleModalForm }>
              <AddBtn />
            </div>
            :
            null
          }
          <SearchBar onSubmit={ handleSearch }/>
        </ScUtilsInner>

        <ScUtilsCounter>Total: { bikes.length }</ScUtilsCounter>
      </ScUtils>

      {/* Send data to ItemList component */}
      <ItemList 
        items={ bikes }
        route={ 'bikes' } />
    </>
  )
}

export default Bikes;