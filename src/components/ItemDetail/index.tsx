import React from 'react';
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
} from './styles';

function ItemDetail(props: any) {
  const currentPath = window.location.pathname.split('/')[1];

  return (
    // even though it's just one item, it must be mapped since returned json is an array
    props.item.map( (item: any, index: any) => 
      <ScItemDetail key={ index }>

        <ScItemDetailTtlArea>
          <div>
            <ScItemDetailName>{ item.name }</ScItemDetailName>
            <ScItemDetailBrand>{ item.brand }</ScItemDetailBrand>
          </div>
          {
            item.public && currentPath !== 'feed' ? <Public></Public> : null
          }
        </ScItemDetailTtlArea>
        

        {/* EmblaCarousel library */}
        <EmblaCarousel slides={ item.images } />

        {/* body area */}
        <ScItemDetailTxtArea>
          {
            item.builtby ?
            <ScItemDetailRow>
              <ScItemDetailDataKey>Built by</ScItemDetailDataKey>
              <ScItemDetailDataVal>{ item.builtby }</ScItemDetailDataVal>
            </ScItemDetailRow>
            :
            null
          }

          {
            item.desc ?
            <ScItemDetailCol>
              <ScItemDetailDataKey>Description</ScItemDetailDataKey>
              <ScItemDetailDataVal>{ item.desc }</ScItemDetailDataVal>
            </ScItemDetailCol>
            :
            null
          }

          {
            item.condition ?
            <ScItemDetailRow>
              <ScItemDetailDataKey>Condition</ScItemDetailDataKey>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={ parseInt(item.condition) } readOnly />
              </Box>
            </ScItemDetailRow>
            :
            null
          }

          {
            item.components ?
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

  )
}

export default ItemDetail;