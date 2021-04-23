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

  @media (max-width: 768px) {
    padding: 0 6px;
  }
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
  margin-top: 36px;
  animation: ${ keyFadeIn } 0.5s ease-in;
`

const ScBtnWrap = styled.div`
  text-align: center;

  &:not(:first-of-type){
    margin-top: 12px;
  }
`

const ScBtn = styled.div`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  text-align-last: left;
  text-decoration: underline;
  transition: all 0.3s ease;
  color: ${ props => props.theme.colors.black };
  cursor: pointer;

  &:hover {
    color: ${ props => props.theme.colors.pink };
  }
`

export {
  ScTxtArea,
  ScTxtRow,
  ScBtnBlock,
  ScBtnWrap,
  ScBtn
}