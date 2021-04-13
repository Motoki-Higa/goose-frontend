import styled, { keyframes } from 'styled-components';

const keyFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`

const ScUtils = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 10px;
  animation: ${ keyFadeIn } 0.5s ease-in;

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