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

const ScUl = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 900px;
  margin: 24px auto 0;
`

const ScLi = styled.li`
  width: auto;
  max-width: 149px;
  padding: 12px;
  animation: ${ keyFadeIn } 0.5s ease-in;

  div {
    position: relative;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all 0.3s ease;

    &:after {
      position: absolute;
      display: block;
      opacity: 0;
      content: '';
      width: inherit;
      height: inherit;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(234,129,218,1) 0%, rgba(98,165,181,1) 100%);
      transition: all .6s ease;
    }
  }

  p {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${ props => props.theme.colors.black };
    text-align: center;
    line-height: 1.2;
    word-break: break-word;
    margin-top: 8px;
    transition: all 0.3s ease;
  }

  &:hover {
    div {
      &:after {
        opacity: 0.6;
        transform: rotate(360deg);
      }
    }
  }

  @media (max-width: 768px) {
    width: 33%;
    max-width: 125px;
    padding: 6px;
  
    div {
      width: 100%;
      height: auto;
      padding-top: 100%;
    }

    p {
      font-size: 0.75rem;
    }
  }
`

export {
  ScUl,
  ScLi
}