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
      font-size: 80%;
    }
    @media screen and (min-width: 1920px){
      font-size: 93%;
    }
  }
  
  body {
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.colors.purple};
    font-family: 'Nunito', sans-serif;
    min-width: 1200px;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
