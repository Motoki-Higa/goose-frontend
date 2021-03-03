import styled from 'styled-components';


const ScNavWrap = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`

const ScNavWrapInner = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 900px;
  border-top: 1px solid #fff;
  padding: 18px 0;
`

const ScLi = styled.li`
  display: inline-block;

  a {
    display: flex;
    align-items: center;
    color: ${ props => props.theme.colors.black };
    text-decoration: none;

    &.active {
      color: ${ props => props.theme.colors.blue };
    }
  }

  p {
    display: inline-block;
    font-size: 0.75rem;
    margin-left: 6px;
  }
`


export {
  ScNavWrap,
  ScNavWrapInner,
  ScLi,
}