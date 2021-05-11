import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import EmblaCarousel from './../EmblaCarousel';
import { Public } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

// context
import { IsMyAccount } from '../../context/IsMyAccountContext';
import { ModalContext } from '../../context/ModalContext';
import { FormContext } from '../../context/FormContext';

// components
import BookmarkBtn from '../../components/buttons/BookmarkBtn/index';
import AddBtn from '../../components/buttons/AddBtn';
import EditBtn from '../../components/buttons/EditBtn';
import DeleteBtn from '../../components/buttons/DeleteBtn';

// styles
import {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
  ScIconsBlock,
  ScItemDetailTxtArea,
  ScItemDetailTtlArea,
  ScItemDetailRow,
  ScItemDetailCol,
  ScItemDetailDataKey,
  ScItemDetailDataVal,
  ScAccountCircleImg,
  ScAccountCircle,
  ScFlexTable,
  ScFlexRow,
  ScFlexCell,
  ScBtnBlock,
  ScBtnWrap
} from './styles';

function ItemDetail(props: any) {
  const currentPath = window.location.pathname.split('/')[1];
  const dashboardCat = window.location.pathname.split('/')[3];

  // contexts
  const { isMyAccount } = useContext(IsMyAccount);
  const { handleModal } = useContext(ModalContext);
  const { handleSetForm } = useContext(FormContext);

  // AddBtn onClick event
  const handleModalForm = (formName: string) => {
    handleModal();
    handleSetForm(formName);
  }

  return (
      <ScItemDetail>
        <ScItemDetailTtlArea>
          <div>
            <ScItemDetailName>{ props.item.name }</ScItemDetailName>
            <ScItemDetailBrand>{ props.item.brand }</ScItemDetailBrand>
          </div>

          <ScIconsBlock>
            { // show public icon if publicity is TRUE and NOT /feed page and Is your own dashboard
              props.item.public === 'true' && currentPath !== 'feed' && isMyAccount ? <Public></Public> : null
            }

            { // bookmark
              props.cat === undefined ?
              <BookmarkBtn bike={ props.item } />
              :
              null
            }
            
            { // show user profile icon only on /feed AND user exists
              currentPath === 'feed' && props.user ?
              <NavLink to={`/${ props.user.username }/dashboard/bikes`}>
                {  // set image url once it's loaded from db
                  props.user.image.location !== '' ?
                  <ScAccountCircleImg style={{backgroundImage: `url( ${ props.user.image.location } )`}} />
                  :
                  <ScAccountCircle />
                }
              </NavLink>
              :
              null
            }
          </ScIconsBlock>
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
            props.item.parts ?
            <ScItemDetailCol>
              <ScItemDetailDataKey>Components</ScItemDetailDataKey>
              <ScFlexTable>
                {
                  props.item.parts.map( (item: any, index: number) => {
                    return (
                      <ScFlexRow key={ index }>
                        <ScFlexCell>{ item.cat }</ScFlexCell>
                        <ScFlexCell>{ item.name }</ScFlexCell>
                      </ScFlexRow>
                    )
                  })
                }
              </ScFlexTable>
            </ScItemDetailCol>
            :
            null
          }


          { // Show this section if on /dashboard/bikes page
            dashboardCat === 'bikes' ?
            <>
              { // Show Add components button if it's bike detail AND no components yet
                !props.item.parts ?
                <ScBtnBlock>
                  <ScBtnWrap onClick={ () => handleModalForm('AddParts') }>
                    <AddBtn />
                    <p>Add components</p>
                  </ScBtnWrap>
                </ScBtnBlock>
                :
                <ScBtnBlock>
                  <ScBtnWrap onClick={ () => handleModalForm('EditParts') }>
                    <EditBtn />
                    <p>Edit components</p>
                  </ScBtnWrap>
                  <ScBtnWrap onClick={ () => handleModalForm('DeleteParts') }>
                    <DeleteBtn />
                    <p>Delete components</p>
                  </ScBtnWrap>
                </ScBtnBlock>
              }
            </>
            :
            null
          }

        </ScItemDetailTxtArea>
      </ScItemDetail>
    ) 
}

export default ItemDetail;