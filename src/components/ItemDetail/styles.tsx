import styled from 'styled-components';

const ScItemDetail = styled.div`
  position: relative;
  width: 100%;
  margin: 20px auto 0;
  padding: 48px 24px 24px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${ props => props.theme.colors.white};
`

const ScItemDetailName = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  color: ${ props => props.theme.colors.black };
`

const ScItemDetailBrand = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025rem;
  margin-top: 8px;
  color: ${ props => props.theme.colors.darkGrey };
`

const ScItemDetailImg = styled.div`

`


export {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
  ScItemDetailImg
}