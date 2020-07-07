import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
    background-color: black;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000;
    color:#ffde59;
    height: 100%;
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffde59;
  }
  img {
    border-radius: 5px;
    height: auto;
    width: 10rem;
  }

  bg {
    border-radius: 5px;
    width: 10rem;
    opacity: 0.5;
  }

  icon{
    border-radius: 5px;    
    top: 10%;
    left: 10px;
  }

  div {
    text-align: center;
  }
  small {
    display: block;
  }
  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
`