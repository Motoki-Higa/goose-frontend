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

const ScItemDetail = styled.div`
  position: relative;
  width: 100%;
  margin: 12px auto 0;
  padding: 20px 20px 40px;
  border-radius: 10px;
  overflow: hidden;
  animation: ${ keyFadeIn } 0.3s ease-in;
  background-color: ${ props => props.theme.colors.white};

  @media (max-width: 768px) {
    margin-top: 12px;
    padding: 16px;
  }
`

const ScItemDetailTtlArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  svg {
    font-size: 1.125rem;
    transition: all 0.3s ease;
    color: ${ props => props.theme.colors.darkGrey};

    @media (max-width: 768px) {
      font-size: 1rem;
    }
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
  margin-top: 8px;
  color: ${ props => props.theme.colors.darkGrey };

  @media (max-width: 768px) {
    font-size: 0.625rem;
    margin-top: 4px;
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

  .MuiBox-root {
    margin-bottom: 0;
  }
`

const ScItemDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;

  &:not(:last-of-type){
    border-bottom: 1px solid ${ props => props.theme.colors.lightGrey };
  }

  div:not(:first-of-type){
    margin-top: 12px;
    line-height: 1.5;
  }
`

const ScItemDetailDataKey = styled.div`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${ props => props.theme.colors.blue };

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
  ScItemDetailTtlArea,
  ScItemDetailName,
  ScItemDetailBrand,
  ScItemDetailTxtArea,
  ScItemDetailRow,
  ScItemDetailCol,
  ScItemDetailDataKey,
  ScItemDetailDataVal
}