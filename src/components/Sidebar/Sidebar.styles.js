import { css } from "@emotion/react";

export const container = css`
display: flex;
width: 255px;
box-sizing: border-box;
flex-direction: column;
align-items: center;

.MuiAutocomplete-root {
    margin-bottom: 50px;
}
@media(max-width: 600px){
    width: 100%;
}

.containerMobile {
    display: none;
    width: 100%;
    
    @media(max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
`