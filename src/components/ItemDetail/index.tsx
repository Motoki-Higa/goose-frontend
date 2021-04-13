import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import EmblaCarousel from './../EmblaCarousel';
import { Public } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

// context
import { IsMyDashboard } from '../../context/IsMyDashboardContext';

// styles
import {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
  ScItemDetailTxtArea,
  ScItemDetailTtlArea,
  ScItemDetailRow,
  ScItemDetailCol,
  ScItemDetailDataKey,
  ScItemDetailDataVal,
  ScAccountCircleImg,
  ScAccountCircle
} from './styles';

function ItemDetail(props: any) {
  const currentPath = window.location.pathname.split('/')[1];

  // contexts
  const { isMyDashboard } = useContext(IsMyDashboard);

  return (
      <ScItemDetail>
        <ScItemDetailTtlArea>
          <div>
            <ScItemDetailName>{ props.item.name }</ScItemDetailName>
            <ScItemDetailBrand>{ props.item.brand }</ScItemDetailBrand>
          </div>

          { // show public icon if publicity is TRUE and NOT /feed page and Is your own dashboard
            props.item.public === 'true' && currentPath !== 'feed' && isMyDashboard ? <Public></Public> : null
          }

          { /* show user profile icon only on /feed */
            currentPath === 'feed' ?
            <NavLink to={`/${ props.user.username }/bikes`}>
             {  
                props.user.image[0] ?
                <ScAccountCircleImg style={{backgroundImage: `url( ${ props.user.image[0].location } )`}} />
                :
                <ScAccountCircle />
             }
            </NavLink>
            :
            null
          }
        </ScItemDetailTtlArea>
        
        {/* EmblaCarousel library */}
        <EmblaCarousel slides={ props.item.images } />

        {/* body area */}
        <ScItemDetailTxtArea>
          {
            props.item.builtby ?
            <ScItemDetailRow>
              <ScItemDetailDataKey>Built by</ScItemDetailDataKey>
              <ScItemDetailDataVal>{ props.item.builtby }</ScItemDetailDataVal>
            </ScItemDetailRow>
            :
            null
          }

          {
            props.item.desc ?
            <ScItemDetailCol>
              <ScItemDetailDataKey>Description</ScItemDetailDataKey>
              <ScItemDetailDataVal>{ props.item.desc }</ScItemDetailDataVal>
            </ScItemDetailCol>
            :
            null
          }

          {
            props.item.condition ?
            <ScItemDetailRow>
              <ScItemDetailDataKey>Condition</ScItemDetailDataKey>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={ parseInt(props.item.condition) } readOnly />
              </Box>
            </ScItemDetailRow>
            :
            null
          }

          {
            props.item.components ?
            <ScItemDetailRow>
              <ScItemDetailDataKey>Components</ScItemDetailDataKey>
              <ScItemDetailDataVal></ScItemDetailDataVal>
            </ScItemDetailRow>
            :
            null
          }

        </ScItemDetailTxtArea>
      </ScItemDetail>
    ) 
}

export default ItemDetail;