import styled from 'styled-components';


interface IScItemCard {
  key: number;
}

const ScItemList = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  justify-content: center;
  margin-top: 20px;
`

const ScItemCard = styled.div<IScItemCard>`
  position: relative;
  flex: 1;
  min-width: 30%;
  max-width: 50%;
  margin: 1%;
  padding: 16px;
  border-radius: 10px;
  background-color: ${ props => props.theme.colors.white};

  @media (max-width: 768px) {
    min-width: 48%;
    max-width: 100%;
    padding: 12px;
  }
`

const ScItemCardImg = styled.div`
  position: relative;
  width: calc(100% + 32px);
  margin-top: 12px;
  margin-left: -16px;

  img {
    width: 100%;
    vertical-align: top;
  }
`

export {
  ScItemList,
  ScItemCard,
  ScItemCardImg
}