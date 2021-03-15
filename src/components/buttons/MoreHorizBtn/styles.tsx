import styled, { keyframes } from 'styled-components';

const keyFadeInTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`

const keyFadeOutTop = keyframes`
  0% {
    opacity: 1;
    transform: translate(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`

const ScMoreHoriz = styled.div`
  position: relative;
`

const ScMoreHorizBtnWrap = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${ props => props.theme.colors.blue};

    svg {
      color: ${ props => props.theme.colors.blue};
    }
  }

  &:focus {
    outline: none;
  }

  svg {
    font-size: 1.5rem !important;
    transition: all 0.3s ease;
    color: ${ props => props.theme.colors.black};
  }
`

const ScMoreOptionTable = styled.div`
  position: absolute;
  /* opacity: 0; */
  width: auto;
  text-align: right;
  right: 0;
  margin-top: 6px;
  padding: 16px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  border-radius: 10px 0 10px 10px;
  animation: ${ keyFadeInTop } 0.3s ease-in;
  background: ${ props => props.theme.colors.gradient};

  &.fadeOut {
    animation: ${ keyFadeOutTop } 0.3s ease-in;
    opacity: 0;
  }

  li {
    font-size: 0.875rem;
    line-height: 1.8;
  }

  a {
    color: ${ props => props.theme.colors.white};
  }
`



export {
  ScMoreHoriz,
  ScMoreHorizBtnWrap,
  ScMoreOptionTable
}