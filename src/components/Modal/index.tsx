import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { FormContext } from '../../context/FormContext';

import {
  ScModal,
  ScModalInner
} from './styles';

interface IProps {
  children?: React.ReactNode;
}

function Modal(props: IProps) {
  // init context to use
  const { isModal, handleCloseModal } = useContext(ModalContext);
  const { handleCloseForm } = useContext(FormContext);

  // make sure to remove form inside the modal too
  const closeModal = () => {
    handleCloseModal();
    handleCloseForm();
  }

  return (
    <>
      {
        isModal ? 
        <ScModal>
          <ScModalInner onClick={ closeModal } />
          { props.children }
        </ScModal>
        :
        null
      }
    </>
  )
}

export default Modal;