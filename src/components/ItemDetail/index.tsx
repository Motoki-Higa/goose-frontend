import React from 'react';
import EmblaCarousel from './../EmblaCarousel';

// styles
import {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
  ScItemDetailTxtArea,
  ScItemDetailRow,
  ScItemDetailCol,
  ScItemDetailDataKey,
  ScItemDetailDataVal,
} from './styles';

function ItemDetail(props: any) {

  return (
    // even though it's just one item, it must be mapped since returned json is an array
    props.item.map( (item: any, index: any) => 
      <ScItemDetail key={ index }>
        <ScItemDetailName>{ item.name }</ScItemDetailName>
        <ScItemDetailBrand>{ item.brand }</ScItemDetailBrand>

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
              <ScItemDetailDataVal>{ item.condition }</ScItemDetailDataVal>
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