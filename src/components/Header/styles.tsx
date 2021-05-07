import styled from 'styled-components';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ScHeader = styled.header`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  top: 0;
  padding: 0 24px;
  box-sizing: border-box;
  z-index: 3;
  
  @media (max-width: 768px) {
    justify-content: space-between;
    height: 50px;
    padding: 0 12px;
  }
`

const ScLogo = styled(Link)`
  color: #fff;

  svg {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 90px;
  }
`

const ScAccountBlock = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-right: 24px;

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`

const ScUsername = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${ props => props.theme.colors.black };
  margin-left: 12px;
`

const ScAccountCircle = styled(AccountCircle)`
  && {
    font-size: 1.75rem;
    color: #fff;
    margin-left: 12px;
  }
`

const ScLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${ props => props.theme.colors.black };

  &:not(:first-of-type){
    margin-left: 12px;
  }
`

export { 
  ScHeader, 
  ScLogo, 
  ScAccountBlock,
  ScUsername, 
  ScAccountCircle,
  ScLink
}