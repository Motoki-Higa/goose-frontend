import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

// contexts
import { CurrentItemContext } from '../../../context/CurrentItemContext';
import { FormContext } from '../../../context/FormContext';
import { IsMyAccount } from '../../../context/IsMyAccountContext';

// components
import ItemDetail from '../../../components/ItemDetail';
import ArrowBackBtn from '../../../components/buttons/ArrowBackBtn';
import MoreHorizBtn from '../../../components/buttons/MoreHorizBtn';

// styles
import {
  ScUtils,
  ScUtilsInner
} from './styles';

function SingleBike(props: any) {

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

  // context
  const { handleSetCurrentItem } = useContext(CurrentItemContext);
  const { detectAnyFormSubmit } = useContext(FormContext);
  const { isMyAccount } = useContext(IsMyAccount);

  // id params
  const { username } = useParams<{ username: string }>();
  const { id } = useParams<{ id: string }>();

  // api call to get a bike
  useEffect( () => {
    // async needs to be inside of useEffect instead of for the callback on useEffect
    (async() => { 
      const profileApi = config.apiBaseUrl + '/profile/' + username;

      await axios.get(profileApi)
        .then( (response) => {     
          const userId = response.data.user_id;
          const bikeApi = config.apiBaseUrl + '/' + userId + '/bikes/' + id;

          axios.get(bikeApi)
            .then( (response) => {
              setBike(response.data);
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

          { // show more option ONLY if it's logged in users dashboard
            isMyAccount ?
            <MoreHorizBtn 
              editForm="EditBike"
              deleteForm="DeleteBike" />
            :
            null
          }
          
        </ScUtilsInner>
      </ScUtils>

      {/* Send data to ItemDetail component */}
      <ItemDetail 
        item={ bike } />
    </>
  )
}

export default SingleBike;