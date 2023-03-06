import { css } from "@emotion/react";

export const footer = css`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
    bottom: 0;
  box-sizing: border-box;
  width: 100%;
  .left-side {
    width: 300px;
    display: flex;
    justify-content: center;
  }
  .center-side {
    flex: 1;
    justify-content: center;
    display: flex;
    .text {
      max-width: 645px;
      display: block;
      text-align: justify;
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 140%;
      letter-spacing: -0.03em;
      color: #526e2b;
    }
  }
  .right-side {
    width: 300px;
    font-family: "Open Sans";
    font-style: normal;
    font-size: 10px;
    line-height: 175%;
    text-align: right;
    letter-spacing: -0.03em;
    color: #526e2b;
    justify-content: center;
    display: flex;
    .content{
        display: flex;
        flex-direction: column;
        .company-name{
            font-weight: 600;
        }
        a{
        text-decoration: none;
        color: #526e2b;
        }
    }
  }
  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    gap: 20px;
    .right-side .content{
        text-align: center;
    }
  }
  ${'' /* @media (min-height: 1000px) {
    position: absolute;
    bottom: 0;
  }
  @media (max-width: 820px) and (max-height: 1180px) {
   position: relative;
  }
  @media (max-width: 1920px) and (max-height: 1080px) {
    position: relative;
  } */}
  @media (max-width: 1440px) and (max-height: 732px) {
    position: relative;
  }
`;
