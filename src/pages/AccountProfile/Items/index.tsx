import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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


function Items() {

  interface IItems {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
  }

  // state : items
  const [ isMyDashboard, setIsMyDashboard ] = useState(false);
  const [ items, setItems ] = useState<IItems[]>([]);
  
  // destructure context to use
  const { authenticatedUser } = useContext<any>(UserContext);
  const { handleModal, handleCloseModal } = useContext(ModalContext);
  const { handleSetForm, handleCloseForm, detectAnyFormSubmit } = useContext(FormContext);

  let history = useHistory();

  // AddBtn onClick event
  const handleModalForm = () => {
    handleModal();
    handleSetForm('AddItem');
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

  // api call to get items
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const profileApi = config.apiBaseUrl + '/profile/' + username;

      await axios.get(profileApi)
        .then( (response) => {     
          const userId = response.data.user_id;
          const itemsApi = config.apiBaseUrl + '/' + userId + '/items';

          // check if it's auth users dashboard
          if (authenticatedUser.username === username){
            setIsMyDashboard(true);

            axios.get(itemsApi)
              .then( (response) => {
                setItems(response.data.reverse());
              });
          } else {
            setIsMyDashboard(false);
            history.push("/" + username);

            return
          }

        })
    
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectAnyFormSubmit]) // detectAnyFormSubmit makes sure to re-render useEffect

  return (
    <>
      {/* <h1 className="Title">Items</h1> */}

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
          
          <SearchBar />
        </ScUtilsInner>

        <ScUtilsCounter>Total: { items.length }</ScUtilsCounter>
      </ScUtils>

      {/* Send data to ItemList component */}
      <ItemList 
        items={ items }
        route={ 'items' } />
    </>
    
  )
}

export default Items;