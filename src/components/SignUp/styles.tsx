import styled from 'styled-components';

const ScPanel = styled.div`
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
  }
`

const ScTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const ScForm = styled.form`
  margin-top: 24px;
`

const ScInputWrap = styled.div`
  width: 100%;
  margin-top: 18px;

  .MuiFormControl-root {
    width: 100%;   
  }
`

const ScBtnWrap = styled.div`
  width: 100%;
  margin-top: 18px;
  text-align: center;

  button {
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    background-color: ${ props => props.theme.colors.blue };

    &:hover {
      background-color: ${ props => props.theme.colors.pink };
    }
  }
`

export {
  ScPanel,
  ScTitle,
  ScForm,
  ScInputWrap,
  ScBtnWrap
}