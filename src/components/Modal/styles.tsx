import styled from 'styled-components';

interface Props {
  onClick: (e: Event) => void;
}

const ScModal = styled.div<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  background-color: rgba(0,0,0,0.3);
  z-index: 99;
`

export {
  ScModal
};