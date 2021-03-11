import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from './../../config';

// components
import ItemDetail from './../../components/ItemDetail';
import ArrowBackBtn from '../../components/buttons/ArrowBackBtn';

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
  // id params
  const { id } = useParams<{ id: string }>();
  // history
  let history = useHistory();


  // function: back to prev page
  const handlePageBack = () => {
    history.goBack();
  }

  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const url = config.apiBaseUrl + '/mybikes/' + id;

      await axios.get(url)
        .then( (response) => {
          // console.log(response.data);
          setBike(response.data);
        });

    })()
  }, [id])

  return (

    <>
      {/* utility bar: ArrowBackBtn & tools btn */}
      <ScUtils>
        <ScUtilsInner>
          <div onClick={ handlePageBack }>
            <ArrowBackBtn />
          </div>
          
        </ScUtilsInner>
      </ScUtils>

      {/* Send data to ItemDetail component */}
      <ItemDetail item={ bike } />
    </>
    
  )
}

export default MyBike;