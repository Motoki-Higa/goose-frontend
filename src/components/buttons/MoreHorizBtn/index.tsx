import React, { useState } from 'react';
import { MoreHoriz, CloseRounded } from '@material-ui/icons';

import {
  ScMoreHoriz,
  ScMoreHorizBtnWrap,
  ScMoreOptionTable
} from './styles';


function MoreHorizBtn() {
  // state for menu table
  const [ menu, setMenu ] = useState(false);
  const [ fadeClass, setFadeClass ] = useState('fadeOut');

  // function: toggle menu state
  const handleToggleState = () => {
    const ms = fadeClass === 'fadeOut' ? 0 : 300;

    setFadeClass(fadeClass === 'fadeIn' ? 'fadeOut' : 'fadeIn');
    setTimeout(() => {
      setMenu(!menu);
    }, ms)
    
  }

  return (
    <ScMoreHoriz>
      <ScMoreHorizBtnWrap onClick={ handleToggleState }>
        {
          menu ?
          <CloseRounded />
          :
          <MoreHoriz />
        }
      </ScMoreHorizBtnWrap>

      {
        menu ?
        <ScMoreOptionTable className={ fadeClass }>
          <ul>
            <li><a href="#">Edit</a></li>
            <li><a href="#">Delete</a></li>
          </ul>
        </ScMoreOptionTable>
        :
        null
      }
    </ScMoreHoriz>
  )
}

export default MoreHorizBtn;