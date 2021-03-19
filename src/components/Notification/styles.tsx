import styled, { keyframes } from 'styled-components';

const keyFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10%);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`

const keyFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(0);
  }

  100% {
    opacity: 0;
    transform: translateX(10%);
  }
`

const ScNotificationBanner = styled.div`
  position: fixed;
  display: flex;
  opacity: 1;
  align-items: center;
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: 0.05rem;
  color: ${ props => props.theme.colors.white };
  width: 200px;
  height: auto;
  top: 0;
  right: 0;
  margin-top: 140px;
  padding: 12px 24px;
  border-radius: 10px 0 0 10px;
  animation: ${ keyFadeIn } 0.3s ease-in;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.3);
  background-color: #6CA3B8;
  z-index: 3;

  &.fadeOut {
    animation: ${ keyFadeOut } 0.3s ease-in;
  }
`;

export {
    ScNotificationBanner
}