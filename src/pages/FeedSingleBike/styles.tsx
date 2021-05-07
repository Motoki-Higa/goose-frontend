import styled from 'styled-components';

const ScUtils = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 24px auto 0;
  padding: 0 10px;
  z-index: 2;

  @media (max-width: 768px) {
    margin-top: 0px;
  }
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