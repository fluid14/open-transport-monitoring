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
  }
  
  body {
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.colors.purple};
    font-family: 'Nunito', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
