import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

// contexts
import { UserContext } from '../../../context/UserContext';
import { ModalContext } from '../../../context/ModalContext';
import { FormContext } from '../../../context/FormContext';

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
  
  // destructure context to use
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleModal, handleCloseModal } = useContext(ModalContext);
  const { handleSetForm, handleCloseForm, detectAnyFormSubmit } = useContext(FormContext);

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

  // username params
  const { username } = useParams<{ username: string }>();

  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const profileApi = config.apiBaseUrl + '/profile/' + username;

      await axios.get(profileApi)
        .then( (response) => {     
          const authUserId = authenticatedUser.id;
          const userId = response.data.user_id;
          // const bikesApi = config.apiBaseUrl + '/' + userId + '/bikes';
          const bikesApi = authUserId === userId ? config.apiBaseUrl + '/' + userId + '/myBikes'
                                                 : config.apiBaseUrl + '/' + userId + '/bikes'

          axios.get(bikesApi)
            .then( (response) => {
              setBikes(response.data.reverse());
            });
        })
    
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectAnyFormSubmit]) // detectAnyFormSubmit makes sure to re-render useEffect

  return (
    <>
      <h1 className="Title">Bikes</h1>

      {/* utility bar: AddBtn & SearchBar & Total number */}
      <ScUtils>
        <ScUtilsInner>
          <div onClick={ handleModalForm }>
            <AddBtn />
          </div>
          
          <SearchBar />
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