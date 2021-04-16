import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bookmark } from '@material-ui/icons';

// context
import { UserContext } from '../../../context/UserContext';

// styles
import {
  ScBookmarkWrap,
} from './styles';

function BookmarkBtn(props: any){
  // state
  const [ isBookmarked, setIsBookmarked ] = useState(false);

  // context
  const { authUserBookmark, handleBookmarkUpdate } = useContext(UserContext);

  // params
  const { id } = useParams<{ id: string }>(); // bike id

  // update bookmark by calling api in context
  const handleOnClick = () => {
    handleBookmarkUpdate(id, isBookmarked);
  }

  useEffect(() => {
    if (authUserBookmark.includes(id)){
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUserBookmark])


  return (
    <ScBookmarkWrap 
      onClick={ handleOnClick } 
      className={`${isBookmarked ? 'active' : null}`} >
      <Bookmark />
    </ScBookmarkWrap>
  )
}

export default BookmarkBtn;