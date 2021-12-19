import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    
    *{
        padding:0;
        margin:0;
        box-sizing: border-box;
        
    }
    body{
        overflow-X:hidden;
    }
    :root{
        --highlight: #F3F3F5;
        --blue-1: #0084FF;
        --blue-2: #00B7FF;
        --active:#55CA36;
        --dark-blue: #002182;
        --deep-blue: #372B47;
        --grey-1: #B0A8B9;
        --white: white; 
        --purple:#4D4DFF;
    }
    html{
        font-size: 10px;
        font-family: 'Helvetica';
        background-color: var(--black);
        ::-webkit-scrollbar {
            width: 1rem;
          }
          
          /* Track */
          ::-webkit-scrollbar-track {
            background: var(--highlight);
          }
          
          /* Handle */
          ::-webkit-scrollbar-thumb {
            border-radius: 5rem;
            background: var(--grey-1);
          }
          
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          -webkit-tap-highlight-color: transparent;
    }
    ul,li{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    img,svg{
        width:100%;
        height: 100%;
        object-fit: cover;
    }
    button{
        outline: none;
    }
    .container{
        max-width: 1200px;
        width: 90%;
        margin: 0 auto;
    }
    /* Smooth Scroll */
`;
export default GlobalStyles;