import React from 'react';
import styled from 'styled-components';


const Title = styled.h1`
    font-size: 10.5rem;
    color: ${ props => props.theme.colors.main }
`;


const Header: React.FC = () => {
    return (
        <header>
            <Title>test</Title>
        </header>  
    )
}

export default Header