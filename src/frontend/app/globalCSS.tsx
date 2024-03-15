// Define o ambiente de execução como cliente
'use client'

// Bibliotecas externas
import { createGlobalStyle } from "styled-components";

// Estilização global
const GlobalCSS = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: black;
}

@font-face {
  font-family: 'Avenir Next LT Pro';
  src: url('@/public/fonts/AvenirNextLTPro/AvenirNextLTPro-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Avenir Next LT Pro';
  src: url('@/public/fonts/AvenirNextLTPro/AvenirNextLTPro-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Avenir Next LT Pro';
  src: url('@/public/fonts/AvenirNextLTPro/AvenirNextLTPro-Demi.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

html body * {
  font-size: 16px;
  font-family: 'Avernir Next LT Pro', Arial, sans-serif !important;
}

html body *:not(i):not(svg):not(g):not(path) {
  font-size: 16px;
  font-family: 'Avernir Next LT Pro', Arial, sans-serif !important;
}

:root {
  --gray: #F0EDED;
  --gray-dark: #D8D5D5;
  --button-blue: #1F5673;
}`

export default GlobalCSS