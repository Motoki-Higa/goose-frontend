import React from 'react';

// styles
import {
  ScItemList,
  ScItemCard,
  ScItemCardImg
} from './styles';


function ItemList(props: any) {
  return (
    <ScItemList>
      {
        props.items.map( (item: any, index: number) => 
          <ScItemCard key={ index }>
            <div>Category</div>
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <ScItemCardImg><img src={item.images[0].location} alt=""/></ScItemCardImg>
          </ScItemCard>
        )
      }
    </ScItemList>
  )
}

export default ItemList;