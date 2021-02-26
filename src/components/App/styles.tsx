// style related
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// reset css
const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  h1, h2, h3, h4, h5, p {
    letter-spacing: 0.075rem;
  }
  
  .MuiFilledInput-input {
    font-size: 14px!important;
    font-weight: 500;
    letter-spacing: 0.05rem;
  }

  .MuiInputLabel-filled {
    font-size: 14px!important;
  }

  .MuiFilledInput-root {
    border-radius: 4px!important;
    background-color: #fff!important;
  }

  .MuiInputBase-input {
    background-color: #fff;
  }

  .MuiFilledInput-underline {
    &:before {
      border-bottom: none!important;
    }

    &:hover:before {
      border-bottom: none!important;
    }
  }

  input:-internal-autofill-selected {
    background-color: #fff;
  }
`

const ScApp = styled.div`
  position: relative;
  font-family: ${ props => props.theme.fonts.primary };
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 60px;
  background-color: ${ props => props.theme.colors.midGrey }
`

const ScAppInner = styled.div`
  position: relative;
  padding: 0 12px;
`

export {
  GlobalStyle,
  ScApp,
  ScAppInner
}