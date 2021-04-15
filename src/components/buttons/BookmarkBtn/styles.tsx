import styled, { keyframes } from 'styled-components';

const keyFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(5px);
  }

  50% {
    opacity: 0;
    transform: translateX(5px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`

const ScBookmarkWrap = styled.div`
  display: inline-block;
  cursor: pointer;
  
  .MuiSvgIcon-root {
    font-size: 2.625rem;
    color: ${ props => props.theme.colors.midGrey };
    animation: ${ keyFadeIn } 0.6s ease-in;

    @media (max-width: 768px) {
      font-size: 1.8125rem;
    }
  }

  &.active {
    .MuiSvgIcon-root {
      color: ${ props => props.theme.colors.pink };
    }
  }
`

export {
  ScBookmarkWrap,
}