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

const ScTable = styled.table`
  position: relative;
  width: 100%;
  max-width: 70%;
  margin: 36px auto 0;
  padding: 0 24px;
  border-radius: 10px;
  animation: ${ keyFadeIn } 0.5s ease-in;

  &:not(:first-of-type){
    margin-top: 24px;
  }

  tr {
    border: 1px solid ${ props => props.theme.colors.midGrey };
    background-color: ${ props => props.theme.colors.lightGrey };
  }

  td {
    padding: 24px;
    vertical-align: middle;
  }

  td:first-of-type {
    font-size: 0.875rem;
    color: ${ props => props.theme.colors.darkGrey };
    width: 25%;
  }

  td:nth-of-type(2) {
    font-size: 1rem;
    font-weight: 500;
    width: 65%;
    padding: 6px 24px;
    color: ${ props => props.theme.colors.black };
  }

  .MuiSvgIcon-root {
    font-size: 1.25rem;
    transition: all 0.3s ease-in-out;
    color: ${ props => props.theme.colors.black };
    cursor: pointer;

    &:hover {
      color: ${ props => props.theme.colors.pink };
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 95%;

    &:not(:first-of-type){
      margin-top: 12px;
    }

    td {
      padding: 12px;
    }

    td:first-of-type {
      font-size: 0.75rem;
    }

    td:nth-of-type(2) {
      font-size: 0.8125rem;
    }

    .MuiSvgIcon-root {
      font-size: 1rem;
    }
  }
`;

const ScBtnBlock = styled.div`
  margin-top: 36px;
  animation: ${ keyFadeIn } 0.5s ease-in;
`

const ScBtnWrap = styled.div`
  text-align: center;

  &:not(:first-of-type){
    margin-top: 12px;
  }
`

const ScBtn = styled.div`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  text-align-last: left;
  text-decoration: underline;
  transition: all 0.3s ease;
  color: ${ props => props.theme.colors.black };
  cursor: pointer;

  &:hover {
    color: ${ props => props.theme.colors.pink };
  }
`

export {
  ScTable,
  ScBtnBlock,
  ScBtnWrap,
  ScBtn
}