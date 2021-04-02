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
  }  

  // state : bikes
  const [ bike, setBike ] = useState<IBike | void>({
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
  const [ user, setUser ] = useState<IUser | void>({
    _id: "", 
    user_id: "", 
    username: "", 
    bio: "", });

  // id params
  const { id } = useParams<{ id: string }>();

  // api call to get bikes
  useEffect( () => {
    // api call to get item
    async function getItem(){
      const urlFeed = config.apiBaseUrl + '/feed/' + id;

      return axios.get(urlFeed)
        .then( response => {
          return response.data;
        })
    };

    // api call to get associate user
    async function getUser(){
      const urlFeed = config.apiBaseUrl + '/feed/' + id;

      return axios.get(urlFeed)
        .then( response => {
          const urlUser = config.apiBaseUrl + '/profile/' + response.data.username;

          return axios.get(urlUser)
            .then(response => {
              return response.data
            })
        })
    };

    // use promise.all to load both together
    Promise.all([getItem(), getUser()])
      .then( results => {
        const [ itemData, userData ] = results;

        setBike(itemData);
        setUser(userData)
      })
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