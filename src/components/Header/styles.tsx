import styled from 'styled-components';
import { AccountCircle } from '@material-ui/icons';

const ScHeader = styled.header`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 24px;
    box-sizing: border-box;
    background: ${ props => props.theme.colors.gradient }; 
`

const ScTitle = styled.h1`
    font-size: 1.625rem;
    font-weight: 500;
    color: #fff;
`

const ScAccountBlock = styled.div`
    display: flex;
    align-items: center;
`

const ScUsername = styled.p`
    font-size: 1.125rem;
    color: #fff;
`

const ScAccountCircle = styled(AccountCircle)`
    && {
        font-size: 1.75rem;
        color: #fff;
        margin-left: 12px;
    }
`

export { 
    ScHeader, 
    ScTitle, 
    ScAccountBlock,
    ScUsername, 
    ScAccountCircle
}