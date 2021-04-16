import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';

// context
import { UserContext } from '../../../context/UserContext';

// components
import ItemList from '../../../components/ItemList';

function Bookmarks(){
  // state
  const [ bookmarks, setBookmarks ] = useState([]);
  // context
  const { authenticatedUser, authUserBookmark }: any = useContext(UserContext);

  // get all saved bike by calling api with bike ids which are stored in 'authUserBookmark'
  useEffect(() => {
    if (authUserBookmark.length > 0){
      const getSavedBikesApi = config.apiBaseUrl + '/' + authenticatedUser.id + '/bookmark/bikes';

      axios({
        method: 'post',
        url: getSavedBikesApi,
        data: {
          bikeIds: authUserBookmark
        }
      })
        .then( response => {
          setBookmarks(response.data)
        })

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUserBookmark])

  return (
    <>
      <h1 className="Title">Bookmarks</h1>
      
      {
        bookmarks ?
        /* Send data to ItemList component */
        <ItemList 
          items={ bookmarks }
          route={ 'feed' } />
        :
        null
      }
    </>
  )
}

export default Bookmarks;