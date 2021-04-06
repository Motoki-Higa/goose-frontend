import styled from 'styled-components';


const ScNavWrap = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    background-color: ${ props => props.theme.colors.lightGrey };
    box-shadow: 0 0 3px rgba(0, 0, 0, .16);
    z-index: 98;
  }
`

const ScNavWrapInner = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 900px;
  border-top: 1px solid #fff;
  padding: 18px 0;

  @media (max-width: 768px) {
    border-top: none;
    padding: 12px 0;
  }
`

const ScLi = styled.li`
  display: inline-block;

  @media (max-width: 768px) {
    width: 20%;
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

    @media (max-width: 768px) {
      flex-direction: column;
      border-top: none;
    }
  }

  p {
    display: inline-block;
    font-size: 0.75rem;
    margin-left: 6px;

    @media (max-width: 768px) {
      font-size: 0.625rem;
      margin: 3px 0 0;
    }
  }
`


export {
  ScNavWrap,
  ScNavWrapInner,
  ScLi,
}