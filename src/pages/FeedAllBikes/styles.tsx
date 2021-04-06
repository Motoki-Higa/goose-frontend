import styled from 'styled-components';

const ScUtils = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 10px;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const ScUtilsInner = styled.div`
  display: flex;
  align-items: center;
`;


export {
  ScUtils,
  ScUtilsInner
}