import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

// context
import { UserContext } from '../../../context/UserContext';

// components
import ItemList from '../../../components/ItemList';
import SearchBar from '../../../components/SearchBar';

// styles
import {
  ScUtils,
  ScUtilsInner,
  // ScUtilsCounter
} from './styles';


function Bookmarks(){
  // state
  const [ bookmarks, setBookmarks ] = useState([]);
  // context
  const { authenticatedUser, authUserBookmark }: any = useContext(UserContext);

  // below are used for search function
  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('q');

  // for search
  const handleSearch = async (data: any) => {
    history.push('/bookmarks/bikes/search?q=' + data.search);
  }

  // get all saved bike by calling api with bike ids which are stored in 'authUserBookmark'
  useEffect(() => {
    if (authUserBookmark.length > 0){
      // const getSavedBikesApi = config.apiBaseUrl + '/' + authenticatedUser.id + '/bookmark/bikes';
      let apiUrl = '';

      if (query){
        apiUrl = config.apiBaseUrl + '/' + authenticatedUser.id + '/bookmark/bikes/search?q=' + query;
      } else {
        apiUrl = config.apiBaseUrl + '/' + authenticatedUser.id + '/bookmark/bikes';
      }

      axios({
        method: 'post',
        url: apiUrl,
        data: {
          bikeIds: authUserBookmark
        }
      })
        .then( response => {
          setBookmarks(response.data)
        })

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUserBookmark, query])

  return (
    <>
      <h1 className="Title">Bookmarks</h1>

      {/* utility bar: AddBtn & SearchBar */}
      <ScUtils>
        <ScUtilsInner>          
          <SearchBar onSubmit={ handleSearch }/>
        </ScUtilsInner>
      </ScUtils>
      
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