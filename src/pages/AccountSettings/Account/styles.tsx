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

const ScTxtArea = styled.div`
  position: relative;
  margin: 36px auto 0;
  padding: 0 24px;
  animation: ${ keyFadeIn } 0.5s ease-in;
`;

const ScTxtRow = styled.div`
  position: relative;
  margin-bottom: 12px;
  animation: ${ keyFadeIn } 0.5s ease-in;

  p {
    font-size: 0.875rem;
    color: ${ props => props.theme.colors.darkGrey };
  }

  span {
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    margin-left: 12px;
    color: ${ props => props.theme.colors.black };
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.75rem;
      color: ${ props => props.theme.colors.darkGrey };
    }

    span {
      display: inline-block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-left: 12px;
      color: ${ props => props.theme.colors.black };
    }
  }
`;

const ScBtnBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: 36px auto 0;
  animation: ${ keyFadeIn } 0.5s ease-in;

  span {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ScEditBtnWrap = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.025rem;
  color: ${ props => props.theme.colors.pink };

  span {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

export {
  ScTxtArea,
  ScTxtRow,
  ScBtnBlock,
  ScEditBtnWrap
}