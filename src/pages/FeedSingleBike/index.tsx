import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

// contexts
import { CurrentItemContext } from '../../context/CurrentItemContext';

// components
import ItemDetail from './../../components/ItemDetail';
import ArrowBackBtn from '../../components/buttons/ArrowBackBtn';

// styles
import {
  ScUtils,
  ScUtilsInner
} from './styles';

function FeedSingleBike() {

  interface IBike {
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

  // state : mybikes
  const [ bike, setBike ] = useState<IBike[]>([]);
  // context
  const { handleSetCurrentItem } = useContext(CurrentItemContext);
  // id params
  const { id } = useParams<{ id: string }>();

  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const url = config.apiBaseUrl + '/feed/' + id;

      await axios.get(url)
        .then( (response) => {
          // console.log(response.data);
          setBike(response.data);
          handleSetCurrentItem(response.data);
        });

    })()
  }, [])

  return (
    <>
      {/* utility bar: ArrowBackBtn & tools btn */}
      <ScUtils>
        <ScUtilsInner>
          <ArrowBackBtn />
        </ScUtilsInner>
      </ScUtils>

      {/* Send data to ItemDetail component */}
      <ItemDetail item={ bike } />
    </>
  )
}

export default FeedSingleBike;