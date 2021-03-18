import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import {
  ScItemList,
  ScItemCard,
  ScItemCardImg,
  ScItemCardCat,
  ScItemCardName,
  ScItemCardBbrand
} from './styles';


function ItemList(props: any) {
  return (
    <ScItemList>
      {
        props.items.map( (item: any, index: number) => 
          <ScItemCard key={ index }>
            <NavLink to={ props.route + '/' +  item._id}>

              { // category
                item.category ? <ScItemCardCat>Category</ScItemCardCat> : null
              }
              
              <ScItemCardName>{item.name}</ScItemCardName>
              <ScItemCardBbrand>{item.brand}</ScItemCardBbrand>

              { // images
                item.images.length > 0 ?

                <ScItemCardImg style={{
                  backgroundImage: `url( ${item.images[0].location} )`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`
                  }}></ScItemCardImg>
                
                :
                <ScItemCardImg style={{
                  background: `linear-gradient(135deg, rgba(234,129,218,1) 0%, rgba(98,165,181,1) 100%)`
                  }}></ScItemCardImg>
              }
                
            </NavLink>
          </ScItemCard>
        )
      }
    </ScItemList>
  )
}

export default ItemList;