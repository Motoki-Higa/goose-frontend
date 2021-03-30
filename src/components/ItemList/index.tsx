import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Public } from '@material-ui/icons';

// contexts
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';

// styles
import {
  ScItemList,
  ScItemCard,
  ScItemCardImg,
  ScItemCardCat,
  ScItemTxtArea,
  ScItemCardName,
  ScItemCardBbrand
} from './styles';


function ItemList(props: any) {
  // this is used for determining whether it's on /feed or not.
  const currentPath = window.location.pathname.split('/')[1];

  // destructure context to use
  const { handleSetLoadedItems, handleSetScrollPosition } = useContext(InfiniteScrollContext);

  const handleInfiniteScrollContext = (e: any) => {
    handleSetScrollPosition(window.pageYOffset);
    handleSetLoadedItems(props.items);
  }

  return (
    <ScItemList>
      {
        props.items.map( (item: any, index: number) => 
          <ScItemCard key={ index }>
            <NavLink 
              onClick={ handleInfiniteScrollContext }
              to={ props.route + '/' +  item._id}>

              { // category
                item.category ? <ScItemCardCat>Category</ScItemCardCat> : null
              }
              
              <ScItemTxtArea>
                <div>
                  <ScItemCardName>{item.name}</ScItemCardName>
                  <ScItemCardBbrand>{item.brand}</ScItemCardBbrand>
                </div>
                {
                  item.public === 'true' && currentPath !== 'feed' ? <Public></Public> : null
                }
              </ScItemTxtArea>
              

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