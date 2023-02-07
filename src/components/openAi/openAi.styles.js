import {css} from '@emotion/react'

export const inputs = (width="300px", height="32px") => css`
  .MuiInputBase-input{
    width: ${width};
    height: ${height} !important;
  }

  .MuiInputBase-root {
    margin-bottom: 40px;
  }
`

export const wrapper = () => css`
  padding: 30px;
  box-sizing: border-box;
  width: 650px;

  .sendButton{
    margin-bottom: 20px;
    width: 80px;
    height: 40px;
  }

  .box{
    min-width: 120m;
    width: 100%;
    margin-bottom: 20px;
  }

  .textArea {
    &.MuiFormControl-root {
      width: 90%;
    }
  }

  .title {
    margin: 0px;
  }

  .subTitle {
    margin-top: 0px;
  }
  
  @media(max-width: 650px) {
    width: 100%;
    padding: 20px;
  }
`
export const footer = css `
height: 38px;
background-color: #F2F2F2;
border-top: none;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
bottom: 0;
width: 100%;

a.text {
  display: flex;
  align-items: center;
  gap: 3.75px;
  color: #8a8a8a;
  font-size: 10px;
  text-decoration: none;
}

@media(max-height: 600px) {
  position: relative;
  margin-top: 30px;
}
`
export const container = css `
  display: flex;
  .box{
      display: flex;
  }
`
