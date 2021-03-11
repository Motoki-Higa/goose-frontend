import React from 'react';

// styles
import {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
  ScItemDetailImg
} from './styles';

function ItemDetail(props: any) {
  return (
    // even though it's just one item, it must be mapped since returned json is an array
    props.item.map( (item: any, index: any) => 
      <ScItemDetail key={ index }>
        <ScItemDetailName>{ item.name }</ScItemDetailName>
        <ScItemDetailBrand>{ item.brand }</ScItemDetailBrand>
      </ScItemDetail>
    ) 

  )
}

export default ItemDetail;