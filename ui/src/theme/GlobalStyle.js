import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800,900&display=swap&subset=latin-ext');

  ${normalize}
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%; 
    @media screen and (min-width: 1366px){
      font-size: 66%;
    }
    @media screen and (min-width: 1440px){
      font-size: 71%;
    }
    @media screen and (min-width: 1680px){
      font-size: 77%;
    }
  }
    
  body {
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.colors.purple};
    background:
       repeating-linear-gradient(to right,
        transparent 0  calc(60px - 1px),
        rgba(255,255,255,0.1) calc(60px - 1px) 60px),
        
      repeating-linear-gradient(to bottom,
        transparent 0 calc(60px - 1px),
        rgba(255,255,255,0.1) calc(60px - 1px) 60px) ${({ theme }) => theme.colors.purple};
    font-family: 'Nunito', sans-serif;
    min-width: 1200px;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
