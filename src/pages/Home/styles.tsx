import styled from 'styled-components';

const ScHero = styled.div`
  position: fixed;
  opacity: 1;
  width: calc(100% - 48px);
  height: calc(100vh - 104px);
  top: 0;
  left: 0;
  right: 0;
  margin: 80px auto;
  z-index: -1;

  @media (max-width: 768px) {
    width: calc(100% - 0px);
    height: calc(100vh - 50px);
    margin: 50px auto;
  }

  &:after {
    display: block;
    position: absolute;
    content: '';
    opacity: 0.2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(135deg, rgba(234,129,218,1) 0%, rgba(98,165,181,1) 100%);
  }
`

const ScTaglineArea = styled.div`
  margin-top: 33vh;
  padding: 0 12px;

  h2 {
    font-size: 1.625rem;
    font-weight: 500;
    line-height: 1.4;
    color: white;
    text-align: center;
  }

`

export {
  ScHero,
  ScTaglineArea
}