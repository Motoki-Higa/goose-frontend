// style related
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// reset css
const GlobalStyle = createGlobalStyle`
  ${reset}
  /* custom reset */
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${ props => props.theme.colors.midGrey };
  }

  h1, h2, h3, h4, h5, li, p, a {
    letter-spacing: 0.05rem;
  }

  a {
    text-decoration: none;
  }

  /* global component is controlled by className */
  /* TIP: each individual component is styled with styled components */
  .App {
    position: relative;
    font-family: ${ props => props.theme.fonts.primary };
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding-top: 80px;

    @media (max-width: 768px) {
      padding-top: 50px;
    }
  }

  .AppInner {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 12px 12px 96px;
  }

  .Title {
    font-size: 1.125rem;
    color: ${ props => props.theme.colors.black };
    text-align: center;
  }


  /* form style reset (include material ui) */
  .formPanel {
    width: 100%;
    max-width: 400px;
    margin: 96px auto 0;
    padding: 24px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    background-color: ${ props => props.theme.colors.lightGrey };

    @media (max-width: 768px) {
      margin-top: 48px;
      padding: 24px 12px;
    }
  }

  .formPanel--modal {
    position: relative;
    width: 94%;
    max-width: 700px;
    max-height: 90%;
    margin: auto;
    overflow-y: scroll;
    z-index: 100;
  }

  .formTitle {
    font-size: 1.125rem;
    font-weight: 500;
    color: #333;
    letter-spacing: 0.05rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }

  .form {
    margin-top: 24px;
  }

  .formInputWrap {
    width: 100%;
    margin-top: 12px;
  }

  .formBtnWrap {
    width: 100%;
    margin-top: 18px;
    text-align: center;

    button {
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
      background-color: ${ props => props.theme.colors.blue };

      &:hover {
        background-color: ${ props => props.theme.colors.pink };
      }

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }
  }

  .formCurrentImgArea {
    margin-top: 20px;
    padding: 12px 12px 8px;
    border-radius: 4px;
    border: 1px solid ${ props => props.theme.colors.pink };
  }

  .formEditArea {
    margin-top: 20px;
    padding: 12px 12px 16px;
    border-radius: 4px;
    border: 1px solid ${ props => props.theme.colors.pink };
  }
  
  .formCurrentImgArea__ttl {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.025rem;
    color: ${ props => props.theme.colors.pink };
  }

  .formCurrentImgArea__inner {
    display: flex;
    overflow-x: scroll;
    margin-top: 12px;
    padding-bottom: 4px
  }

  .formPreviewImgArea {
    display: flex;
    overflow-x: scroll;
    margin-top: 12px;
  }

  .formPreviewImg {
    position: relative;
    max-width: 33.333%;
    min-width: 20%;
    height: auto;
    margin: 1%;
    padding-top: 14%;
    border-radius: 5px;
    overflow: hidden;

    @media (max-width: 768px) {
      min-width: 30%;
      padding-top: 20%;
    }

    img {
      width: 100%;
      vertical-align: top;
    }

    svg {
      position: absolute;
      color: #fff;
      right: 0;
      bottom: 0;
      margin: 0 6px 6px 0;
      padding: 2px;
      border-radius: 50%;
      cursor: pointer;
      background-color: ${ props => props.theme.colors.pink };
    }
  }

  .formPanelError {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    color: #f44336;
    letter-spacing: 0.03333em;
    margin: 8px 14px;
  }

  .formErrorMsg {
    font-size: 0.875rem;
    text-align: center;
    letter-spacing: 0.025rem;
    line-height: 1.4;
    color: ${ props => props.theme.colors.pink };
  }

  .MuiFormControl-root {
    width: 100%;   
  }

  .MuiButton-contained {
    line-height: 1!important;
    padding: 12px 24px 10px!important;
    border-radius: 20px!important;
  }
  
  .MuiFilledInput-input {
    font-size: 0.875rem!important;
    font-weight: 500;
    letter-spacing: 0.05rem;
  }

  .MuiInputLabel-filled {
    font-size: 14px!important;
  }

  .MuiFormLabel-root.Mui-focused {
    color: #6CA3B8!important;
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

    &:after {
      border-bottom-color: #6CA3B8!important;
    }
  }

  .MuiRating-root {
    color: ${ props => props.theme.colors.pink }!important;
  }

  .MuiTypography-body1 {
    font-size: 0.875rem!important;
    font-weight: 500!important;
    color: ${ props => props.theme.colors.black };
  }

  input:-internal-autofill-selected {
    background-color: #fff;
  }
`


export {
  GlobalStyle
}