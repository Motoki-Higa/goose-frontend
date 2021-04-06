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

const ScUtilsCounter = styled.div`
  display: flex;
  font-size: 0.875rem;
  letter-spacing: 0.05rem;
  color: ${ props => props.theme.colors.black };
`;


export {
  ScUtils,
  ScUtilsInner,
  ScUtilsCounter
}