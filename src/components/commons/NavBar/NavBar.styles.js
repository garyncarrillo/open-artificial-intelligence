import {css} from '@emotion/react'

export const nav = css`
    position: absolute;
    top: 20px;
    display: flex;
    gap: 20px;

    padding: 7px 12px;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    margin: 20px;
    a{
        text-decoration: none;
        font-weight: 500;
        color: #426e03;
        &.active{
            text-decoration: revert;
        }
    }
    @media (max-width: 600px){
      position: relative;
      margin-bottom: 10px;
    }
`