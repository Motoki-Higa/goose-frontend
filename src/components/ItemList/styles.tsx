import styled, { keyframes } from 'styled-components';


interface IScItemCard {
  key: number;
}

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

const ScItemList = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  justify-content: center;
  margin-top: 5px;
  animation: ${ keyFadeIn } 0.5s ease-in;
`

const ScItemCard = styled.div<IScItemCard>`
  position: relative;
  flex: 1;
  align-self: flex-end;
  min-width: 30%;
  max-width: 50%;
  margin: 1%;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${ props => props.theme.colors.white};

  @media (max-width: 768px) {
    min-width: 48%;
    max-width: 100%;
    /* padding: 10px 10px 0; */
  }

  a {
    display: block;
    text-decoration: none;
    padding: 16px 16px 0;
  }
`

const ScItemCardImg = styled.div`
  position: relative;
  width: calc(100% + 32px);
  height: auto;
  padding-top: 90%;
  margin-top: 12px;
  margin-left: -16px;

  @media (max-width: 768px) {
    width: calc(100% + 32px);
    margin-top: 8px;
    margin-left: -16px;
  }

  img {
    width: calc(100%);
    vertical-align: top;
  }
`

const ScItemCardCat = styled.div`
  font-size: 0.875rem;
  text-align: right;
  letter-spacing: 0.025rem;
  color: ${ props => props.theme.colors.darkGrey };

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`

const ScItemCardName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  margin-top: 12px;
  color: ${ props => props.theme.colors.black };

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 8px;
  }
`

const ScItemCardBbrand = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  margin-top: 6px;
  color: ${ props => props.theme.colors.darkGrey };

  @media (max-width: 768px) {
    font-size: 0.625rem;
    margin-top: 2px;
  }
`

export {
  ScItemList,
  ScItemCard,
  ScItemCardImg,
  ScItemCardCat,
  ScItemCardName,
  ScItemCardBbrand
}