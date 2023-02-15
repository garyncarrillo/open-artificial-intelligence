import { css } from "@emotion/react";

export const container = css`
display: flex;
border-left: 1px solid rgba(118,118,118, 0.2);
width: 250px;
padding: 20px 10px;
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
    
    .sendButton{
        margin-bottom: 20px;
        width: 80px;
        height: 40px;
    }

    @media(max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
`