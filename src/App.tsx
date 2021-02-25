import React from 'react';
import Header from './components/Header/index';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';


// reset css
const GlobalStyle = createGlobalStyle`
    ${reset}
    /* other styles */
    h1, h2, h3, h4, h5, p {
        letter-spacing: 0.075rem;
    }  
`

const ScApp = styled.div`
    font-family: ${ props => props.theme.fonts.primary }
`


function App() {
    return (
        <ScApp className="App">
            <GlobalStyle />
            <Header></Header>
        </ScApp>
    );
}

export default App;
