import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    website: string;
    image:[{
      key: string;
      location: string;
    }]
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
    bio: "",
    website: "",
    image: [{
      key: "", 
      location: ""
    }] 
  });

  // id params
  const { id } = useParams<{ id: string }>();

  // api call to get bikes
  useEffect( () => {
    ( async () => {
      try {
        const urlFeed = config.apiBaseUrl + '/feed/' + id;
        let data: any = [];

        await axios.get(urlFeed)
          .then( response => {
            // const urlUser = config.apiBaseUrl + '/' + response.data.user_id + '/profile';
            const urlUser = config.apiBaseUrl + '/profile/userId/' + response.data.user_id;
            data.push(response.data);

            axios.get(urlUser)
              .then(response => {
                data.push(response.data);
              })
              .then(() => {
                setBike(data[0]);
                setUser(data[1]);
              })
          })
    
      } catch(err) {
        console.log(err.response.data.message)
      }
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

      {
        bike._id !== '' ?
        /* Send data to ItemDetail component */
        <ItemDetail 
          item={ bike }
          user={ user } />
        :
        null
      }
    </>
  )
}

export default FeedSingleBike;