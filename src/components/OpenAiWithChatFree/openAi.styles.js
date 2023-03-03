import { css } from "@emotion/react";

export const inputs = (width = "300px", height = "32px") => css`
  .MuiInputBase-input {
    width: ${width};
    height: ${height} !important;
  }
`;

export const wrapper = () => css`
  display: flex;
  flex-direction: column;
  flex: 1;
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
`;

export const container = css`
  display: flex;
  max-width: 984px;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 17px 38px rgba(0, 0, 0, 0.14),
    0px 3.79717px 8.4878px rgba(0, 0, 0, 0.083455),
    0px 1.13052px 2.52704px rgba(0, 0, 0, 0.056545);
  border-radius: 16px;
  gap: 30px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 32px;
  .input-chatfree {
    width: 100%;
    padding: 10px;
    height: 520px;
    overflow-y: auto;
    border: 1px solid gray;
    border-radius: 3px;
    box-sizing: border-box;
  }

  &.container-response {
    .MuiFormControl-root {
      width: 100%;
    }
    .result-label {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #1a1a1a;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    &.container-request,
    &.container-response {
      width: 95%;
    }
    .hideOnMobile {
      display: none;
    }

    .showOnMobile {
      display: inherit;
      box-sizing: border-box;
    }
  }
  @media (max-width: 1024px) {
    &.container-request,
    &.container-response {
      width: 95%;
    }
  }
`;

export const dynamicInput = css`
  width: 100%;
  margin-bottom: 15px;
`;

export const body = css`
  background: #e7f1da;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  .link-goto {
    a {
      text-decoration: none;
      font-weight: 500;
      color: #000;
    }
    padding: 7px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    margin: 20px;
    @media (max-width: 600px) {
      position: relative;
      margin-bottom: 10px;
    }
  }
`;
