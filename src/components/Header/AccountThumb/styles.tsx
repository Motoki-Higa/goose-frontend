import styled, { keyframes } from 'styled-components';
import { AccountCircle } from '@material-ui/icons';

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

const ScAccountCircleWrapper = styled.div`
  position: relative;
  margin-left: 12px;
  z-index: 10;
`

const ScAccountCircleImg = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

const ScAccountCircle = styled(AccountCircle)`
  && {
    position: relative;
    font-size: 1.75rem;
    color: ${ props => props.theme.colors.darkGrey };
    transition: all 0.3s ease;
    cursor: pointer;
    vertical-align: top;
  }

  &:hover {
    color: ${ props => props.theme.colors.blue };
  }
`

const ScMoreOptionTable = styled.div`
  position: absolute;
  width: auto;
  text-align: left;
  top: 0;
  right: 0;
  margin-top: 35px;
  padding: 16px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  border-radius: 10px 0 10px 10px;
  animation: ${ keyFadeInTop } 0.3s ease-in;
  background: ${ props => props.theme.colors.lightGrey};

  @media (max-width: 768px) {
    width: 120px;
  }

  &.fadeOut {
    animation: ${ keyFadeOutTop } 0.3s ease-in;
    opacity: 0;
  }

  li {
    font-size: 0.875rem;
    line-height: 1.8;
    cursor: pointer;
  }

  a {
    color: ${ props => props.theme.colors.black};
    transition: all 0.3s ease;

    &:hover {
      color: ${ props => props.theme.colors.blue};
    }
  }
`

export { 
  ScAccountCircleWrapper,
  ScAccountCircleImg,
  ScAccountCircle,
  ScMoreOptionTable
}