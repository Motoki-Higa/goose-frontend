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

const ScSubNav = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.5;
  max-width: 900px;
  margin: 12px auto 0;
  padding: 12px 0;
  animation: ${ keyFadeIn } 0.5s ease-in;
  border-bottom: 1px solid ${ props => props.theme.colors.lightGrey };

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 12px;
  }

  a {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    color: ${ props => props.theme.colors.black };
    text-decoration: none;

    :hover {
      color: ${ props => props.theme.colors.pink };
    }

    &.active {
      color: ${ props => props.theme.colors.blue };
    }
  }

  p {
    display: inline-block;
    font-size: 0.75rem;
    margin-left: 6px;
  }
`;

export {
  ScSubNav
}