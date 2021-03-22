import styled from 'styled-components';

const ScUtils = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 10px;
`;

const ScUtilsInner = styled.div`
  display: flex;
  align-items: center;
`;

const ScUtilsCounter = styled.div`
  display: flex;
  color: ${ props => props.theme.colors.black };
`;


export {
  ScUtils,
  ScUtilsInner,
  ScUtilsCounter
}