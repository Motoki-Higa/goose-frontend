import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Public } from '@material-ui/icons';

// contexts
import { InfiniteScrollContext } from '../../context/InfiniteScrollContext';
import { IsMyAccount } from '../../context/IsMyAccountContext';

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
  const search = window.location.search;

  // context
  const { handleSetPath, handleSetLoadedItems, handleSetScrollPosition } = useContext(InfiniteScrollContext);
  const { isMyAccount } = useContext(IsMyAccount);

  const handleInfiniteScrollContext = () => {
    // since this component is used for feed / mybikes / items, current path has to be stored in context for avoiding loading different items when user moves from detail page (items) -> list page (feed) for example
    handleSetPath(currentPath)
    handleSetLoadedItems(props.items);
    handleSetScrollPosition(window.pageYOffset);
  }

  return (
    <ScItemList>
      {
        props.items.map( (item: any, index: number) => 
          <ScItemCard key={ index }>
            <NavLink 
              onClick={ handleInfiniteScrollContext }
              to={ // since search result component inherits category slug, set only item id, if it's searched list
                search ? item._id
                       : props.route + '/' +  item._id
                } >

              { // category
                item.category ? <ScItemCardCat>Category</ScItemCardCat> : null
              }
              
              <ScItemTxtArea>
                <div>
                  <ScItemCardName>{item.name}</ScItemCardName>
                  <ScItemCardBbrand>{item.brand}</ScItemCardBbrand>
                </div>
                
                {// show public icon if publicity is TRUE and NOT /feed page and Is your own dashboard
                  item.public === 'true' && currentPath !== 'feed' && isMyAccount ? <Public></Public> : null
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