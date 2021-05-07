import styled from 'styled-components';


const ScAssistBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 400px;
  margin: 24px auto 0;

  a {
    font-size: 0.875rem;
    color: ${ props => props.theme.colors.white }
  }
`

export {
  ScAssistBlock
}