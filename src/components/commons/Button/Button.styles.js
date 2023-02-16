import { css } from "@emotion/react";


export const button = css`
    text-transform: initial;
    padding: 12px 18px;
    font-size: 18px;
    background: #8EBA4F;
    align-self: center;
    margin-top: 10px;
    &:hover{
        background:rgba(142,186,79,0.8);
    }
    .button-text{
        min-width: 116px;
        min-height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        .MuiCircularProgress-root{
            color: #8EBA4F;
        }
    }
`