import styled from 'styled-components';

const ScUtils = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 10px;
  z-index: 2;
`;

const ScUtilsInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;


export {
  ScUtils,
  ScUtilsInner
}