import { createGlobalStyle } from 'styled-components'
import { titleFont, textFont, gutter, semi } from './vars'
import media from './media'

export default createGlobalStyle`

    :root {
        --half-text-split-color: ${p => p.theme.color};
    }
    * {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased!important;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: geometricPrecision;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline:none;
        box-sizing: border-box;
    }

     html,body, #___gatsby,  #___gatsby > div{
     height: 100%;
    }


     
    
    body,
    html {
        background: ${p => p.theme.backgroundColor};
        font-size: 18px;
        
        ${media.tablet`
            font-size: 16px;   
        `}

        ${media.phone`
            font-size: 14px;   
        `}
    }

    body {
       
        color: ${p => p.theme.color};
        transition: ${p => p.theme.transition};
        font-family: ${textFont};
        line-height: 1.55; 
        font-weight: 400;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        -ms-font-smoothing: antialiased;
        font-smoothing: antialiased;
        overscroll-behavior: none;

        position:fixed;
    }

    body.scroll {
        position:static;
    }
    
    body.scroll-lock {
        height: 100%;
        overflow: hidden;
    }

    #gatsby-noscript {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        font-size: 16px;
    }

    a {
        color: ${p => p.theme.color};
        font-weight: ${semi};
    }


    img {
        max-width:100%;
    }

    p {
        margin-bottom: 1em;
    }

    h1,h2,h3 {
        font-family: ${titleFont};
        font-weight:800;
    }

    h1 {
        font-size: 5rem;
        line-height: 1.1;

        ${media.phone`
            font-size:4rem;
        `}
    }

    h2 {
        font-size: 3rem;
        line-height:1.1;

        margin-bottom: ${gutter * 2}px;

        ${media.phone`
            margin-bottom: ${gutter}px;
        `}
    }

    h3 {
        margin-bottom: ${gutter * 2}px;

        ${media.phone`
            margin-bottom: ${gutter}px;
        `}
    }
    
`
