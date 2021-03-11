import styled from 'styled-components';

const ScItemDetail = styled.div`
  position: relative;
  width: 100%;
  margin: 20px auto 0;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${ props => props.theme.colors.white};

  @media (max-width: 768px) {
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


export {
  ScItemDetail,
  ScItemDetailName,
  ScItemDetailBrand,
}