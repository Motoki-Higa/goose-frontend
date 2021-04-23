import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

// contexts
import { CurrentItemContext } from '../../../context/CurrentItemContext';
import { FormContext } from '../../../context/FormContext';

// components
import ItemDetail from '../../../components/ItemDetail';
import ArrowBackBtn from '../../../components/buttons/ArrowBackBtn';
import MoreHorizBtn from '../../../components/buttons/MoreHorizBtn';

// styles
import {
  ScUtils,
  ScUtilsInner
} from './styles';

function SingleItem(props: any) {

  interface IItem {
    _id: string;
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
  }

  // state : item
  const [ item, setItem ] = useState<IItem>({
    _id: "",
    name: "",
    brand: "",
    builtby: "",
    desc: "",
    images: [{
      key: "",
      location: "",
    }]
  });

  // context
  const { handleSetCurrentItem } = useContext(CurrentItemContext);
  const { detectAnyFormSubmit } = useContext(FormContext);

  // params
  const { username } = useParams<{ username: string }>();
  const { id } = useParams<{ id: string }>();

  // api call to get an item
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const profileApi = config.apiBaseUrl + '/profile/' + username;

      await axios.get(profileApi)
        .then( (response) => {     
          const userId = response.data.user_id;
          const itemApi = config.apiBaseUrl + '/' + userId + '/items/' + id;

          axios.get(itemApi)
            .then( (response) => {
              setItem(response.data);
              handleSetCurrentItem(response.data);
            });
        })

    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detectAnyFormSubmit])

  return (
    <>
      {/* utility bar: ArrowBackBtn & tools btn */}
      <ScUtils>
        <ScUtilsInner>
          <ArrowBackBtn />
          <MoreHorizBtn 
            editForm="EditItem"
            deleteForm="DeleteItem" />
        </ScUtilsInner>
      </ScUtils>

      {/* Send data to ItemDetail component */}
      <ItemDetail 
        item={ item } 
        cat="item" />
    </>
  )
}

export default SingleItem;