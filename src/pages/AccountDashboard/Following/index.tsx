import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

// context
import { UserContext } from '../../../context/UserContext';

// style
import {
  ScUl,
  ScLi
} from './styles';


function Following(){
  // state
  const [ following, setFollowing ] = useState([]);

  // context
  const { authUserFollowing } = useContext(UserContext);

  useEffect(() => {
    if (authUserFollowing.length > 0){
      const BaseUrl = config.apiBaseUrl;
      const url = BaseUrl + '/following';

      axios({
        method: 'post',
        url: url,
        data: {
          followingIds: authUserFollowing
        }
      })
      .then( response => {
        setFollowing(response.data);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUserFollowing])

  return (
    <>
      <h1 className="Title">Following</h1>

      <ScUl>
        {
          following.map( (following: any, index: number) => {
            return (
              <ScLi key={ index }>
                <NavLink to={`/${ following.username }/dashboard/bikes`} >
                  <div style={{backgroundImage: `url( ${ following.image.location } )`}} ></div>
                  <p>{ following.username }</p>
                </NavLink>
              </ScLi>
            )
          })
        }
      </ScUl>
    </>
  )
}

export default Following;