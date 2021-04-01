import styled from 'styled-components';


const ScError = styled.div`
  font-size: 0.875rem;
  text-align: center;
  color: ${ props => props.theme.colors.pink};
  margin-top: 24px;

  &:not(:first-of-type){
    margin-top: 12px;
  }
`

export {
  ScError
}