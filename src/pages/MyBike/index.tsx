import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

// contexts
import { CurrentItemIdContext } from '../../context/CurrentItemIdContext';

// components
import ItemDetail from './../../components/ItemDetail';
import ArrowBackBtn from '../../components/buttons/ArrowBackBtn';
import MoreHorizBtn from '../../components/buttons/MoreHorizBtn';

// styles
import {
  ScUtils,
  ScUtilsInner
} from './styles';

function MyBike() {
  

  interface IBike {
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
  }

  // state : mybikes
  const [ bike, setBike ] = useState<IBike[]>([]);
  // currentItem context
  const { handleCurrentItemId } = useContext(CurrentItemIdContext);
  // id params
  const { id } = useParams<{ id: string }>();

  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const url = config.apiBaseUrl + '/mybikes/' + id;

      await axios.get(url)
        .then( (response) => {
          // console.log(response.data);
          setBike(response.data);
          handleCurrentItemId(id);
        });

    })()
  }, [id])

  return (
    <>
      {/* utility bar: ArrowBackBtn & tools btn */}
      <ScUtils>
        <ScUtilsInner>
          <ArrowBackBtn />
          <MoreHorizBtn />
        </ScUtilsInner>
      </ScUtils>

      {/* Send data to ItemDetail component */}
      <ItemDetail item={ bike } />
    </>
  )
}

export default MyBike;