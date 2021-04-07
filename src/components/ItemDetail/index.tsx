import React from 'react';
import { NavLink } from 'react-router-dom';
import EmblaCarousel from './../EmblaCarousel';
import { Public } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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

  return (
      <ScItemDetail>
        <ScItemDetailTtlArea>
          <div>
            <ScItemDetailName>{ props.item.name }</ScItemDetailName>
            <ScItemDetailBrand>{ props.item.brand }</ScItemDetailBrand>
          </div>

          { // show public icon only if the publicity is true and /feed page
            props.item.public === 'true' && currentPath !== 'feed' ? <Public></Public> : null
          }

          { /* show user profile icon only on /feed */
            currentPath === 'feed' ?
            <>
             {  
                props.user.image[0] ?
                <NavLink to={`/${ props.user.username }`}>
                  <ScAccountCircleImg
                  style={{
                    backgroundImage: `url( ${ props.user.image[0].location } )`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`
                    }} />
                </NavLink>
                :
                <NavLink to={`/${ props.user.username }`}>
                  <ScAccountCircle />
                </NavLink>
             }
            </>
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