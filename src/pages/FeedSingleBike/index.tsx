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
    user_id: string;
    username: string;
    name: string;
    brand: string;
    builtby: string;
    desc: string;
    images: [{
      key: string;
      location: string;
    }];
  }
  interface IUser {
    _id: string;
    user_id: string;
    username: string;
    bio: string;
  }  

  // state : bikes
  const [ bike, setBike ] = useState<IBike>({
    _id: "",
    user_id: "",
    username: "",
    name: "",
    brand: "",
    builtby: "",
    desc: "",
    images: [{
      key: "",
      location: "",
    }]
  });
  const [ user, setUser ] = useState<IUser>({
    _id: "", 
    user_id: "", 
    username: "", 
    bio: "", });

  // context
  const { handleSetCurrentItem } = useContext(CurrentItemContext);

  // id params
  const { id } = useParams<{ id: string }>();

  // api call to get bikes
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const urlFeed = config.apiBaseUrl + '/feed/' + id;

      await axios.get(urlFeed)
        .then( response => {
          setBike(response.data);
          handleSetCurrentItem(response.data);
          console.log(response.data)

          return response.data.username;
        })
        .then( response => {
          const urlUser = config.apiBaseUrl + '/profile/' + response;
          
          axios.get(urlUser)
            .then(response => {
              setUser(response.data)
            })
        })

    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ItemDetail 
        item={ bike }
        user={ user } />
    </>
  )
}

export default FeedSingleBike;