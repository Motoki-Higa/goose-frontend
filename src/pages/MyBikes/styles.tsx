import styled from 'styled-components';

const ScUtils = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const ScUtilsInner = styled.div`
  display: flex;
`;

const ScCounter = styled.div`
  display: flex;
  color: ${ props => props.theme.colors.black };
`;


export {
  ScUtils,
  ScUtilsInner,
  ScCounter
}