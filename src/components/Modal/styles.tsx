import styled from 'styled-components';


const ScModal = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  background-color: rgba(0,0,0,0.3);
  z-index: 99;
`

const ScModalInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export {
  ScModal,
  ScModalInner
};