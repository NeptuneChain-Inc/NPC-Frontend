import { createGlobalStyle } from "styled-components";
import SatoshiNormal from "../fonts/Satoshi-Regular.woff2";
import SatoshiMedium from "../fonts/Satoshi-Medium.woff2";
import SatoshiBold from "../fonts/Satoshi-Bold.woff2";

export const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: "Satoshi";
        src: url(${SatoshiNormal}) format("woff2");
        font-weight: 400;
    }
    @font-face {
        font-family: "Satoshi";
        src: url(${SatoshiMedium}) format("woff2");
        font-weight: 500;
    }
    

    @font-face {
        font-family: "Satoshi";
        src: url(${SatoshiBold}) format("woff2");
        font-weight: 600;
    }


    * { 
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-family: "Satoshi", sans-serif;
}

body{
         box-sizing: border-box;
         padding: 0px;
         margin: 0px;
         box-sizing: border-box;
    }
`;
