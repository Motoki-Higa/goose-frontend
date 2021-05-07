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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 24px auto 0;
  padding: 0 10px;
  z-index: 2;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const ScUtilsInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ScNotFound = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  color: ${ props => props.theme.colors.pink };
  margin-top: 48px;
  animation: ${ keyFadeIn } 0.5s ease-in;
`


export {
  ScUtils,
  ScUtilsInner,
  ScNotFound
}