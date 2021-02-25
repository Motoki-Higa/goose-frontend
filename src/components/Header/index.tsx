import React from 'react';
import { 
    ScHeader, 
    ScTitle, 
    ScAccountBlock,
    ScUsername, 
    ScAccountCircle,
} from './styles';

const Header: React.FC = () => {
    return (
        <ScHeader>
            <ScTitle>GOOSE</ScTitle>
            <ScAccountBlock>
                <ScUsername>Username</ScUsername>
                <ScAccountCircle></ScAccountCircle>   
            </ScAccountBlock>
        </ScHeader>  
    )
}

export default Header