import styled from 'styled-components';

const ScItemDetail = styled.div`
  position: relative;
  width: 100%;
  margin: 12px auto 0;
  padding: 20px 20px 40px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${ props => props.theme.colors.white};

  @media (max-width: 768px) {
    margin-top: 12px;
    padding: 16px;
  }
`

const ScItemDetailName = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  margin-top: 12px;
  color: ${ props => props.theme.colors.black };

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const ScItemDetailBrand = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025rem;
  margin-top: 6px;
  color: ${ props => props.theme.colors.darkGrey };

  @media (max-width: 768px) {
    font-size: 0.625rem;
    margin-top: 2px;
  }
`

const ScItemDetailTxtArea = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 24px auto 0;
  border-top: 1px solid ${ props => props.theme.colors.pink };
`

const ScItemDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;

  &:not(:last-of-type){
    border-bottom: 1px solid ${ props => props.theme.colors.lightGrey };
  }
`

const ScItemDetailDataKey = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${ props => props.theme.colors.black };

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const ScItemDetailDataVal = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${ props => props.theme.colors.black };

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`


export {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
  ScItemDetailTxtArea,
  ScItemDetailRow,
  ScItemDetailDataKey,
  ScItemDetailDataVal
}