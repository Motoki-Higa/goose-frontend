import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

// contexts
import { CurrentItemContext } from '../../context/CurrentItemContext';
import { FormContext } from '../../context/FormContext';

// components
import ItemDetail from './../../components/ItemDetail';
import ArrowBackBtn from '../../components/buttons/ArrowBackBtn';
import MoreHorizBtn from '../../components/buttons/MoreHorizBtn';

// styles
import {
  ScUtils,
  ScUtilsInner
} from './styles';

function MyItem() {

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

  // state : myitems
  const [ item, setItem ] = useState<IItem[]>([]);
  // context
  const { handleSetCurrentItem } = useContext(CurrentItemContext);
  const { detectAnyFormSubmit } = useContext(FormContext);
  // id params
  const { id } = useParams<{ id: string }>();

  // api call to get items
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const url = config.apiBaseUrl + '/myitems/' + id;

      await axios.get(url)
        .then( (response) => {
          // console.log(response.data);
          setItem(response.data);
          handleSetCurrentItem(response.data);
        });

    })()
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
      <ItemDetail item={ item } />
    </>
  )
}

export default MyItem;