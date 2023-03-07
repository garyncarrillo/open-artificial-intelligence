import styled from "@emotion/styled";
// import colors from "../../../app/styles/colors";
import {colors, hexToRgb} from '../../utils'
// import { hexToRgb } from "../../../app/utils";

export const Trigger = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    background: #eaeaea;
  }

  &.heading-trigger {
    border-right: 1px solid ${colors.alto};
  }

  .dropdown {
    position: absolute;
    left: 0;
    top: 33px;
    background-color: ${colors.white};
    border: 1px solid rgba(${hexToRgb(colors.black)}, 0.15);
    box-shadow: 0 6px 12px rgba(${hexToRgb(colors.black)}, 0.175);
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    z-index: 2;
  }

  &:hover {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }

  .heading-button {
    display: inline-block;
    padding: 0 10px;
  }

  .heading-list {
    &__item {
      width: 100%;
      border: 0;
      text-align: left;
      cursor: pointer;
      padding: 5px 15px;

      &:hover {
        background-color: ${colors.concrete};
      }
    }
  }

  .emoji-mart-search {
    display: none;
  }

  .align-options {
    display: flex;
    height: 30px;
    padding: 5px;
  }

  &.order-list-trigger {
    margin-right: 5px;
  }

  .color-preview-container {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;

    .color-preview,
    .highlight-preview {
      width: 100%;
      padding-top: 1px;
      padding-bottom: 1px;
    }

    .color-preview {
      background-color: rgb(0, 0, 0);
    }

    .highlight-preview {
      background-color: transparent;
    }
  }

  .colors-container {
    padding: 5px;
  }

  .colors {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(7, 1fr);

    .color-item {
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 4.3px;
      border: none;

      &.active {
        position: relative;

        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 12px;
          border-bottom: 3px solid white;
          border-right: 3px solid white;
          transform: translate(-50%, -63%) rotate(45deg);
        }

        &.is-white {
          &:after {
            border-bottom: 3px solid ${colors.silver};
            border-right: 3px solid ${colors.silver};
          }
        }
      }

      &.is-white {
        border: 1px solid ${colors.silver};
      }
    }
  }

  .custom-color-container {
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
    border-radius: 3px;
    border: 1px solid ${colors.silver};
    padding: 7px 12px;
    margin-top: 10px;
    margin-bottom: 10px;

    &:hover {
      cursor: pointer;
    }

    .input-color {
      position: absolute;
      width: 136px;
      background: ${colors.gray};
      border: none;
      border-radius: 4px;
      outline: 0px;

      &:after {
        content: "Pick Custom Color";
        text-align: center;
        top: 0px;
        left: 0px;
        position: absolute;
        background: ${colors.gray};
        width: 136px;
        height: 24px;
        color: ${colors.white};
        font-weight: 600;
        font-size: 12px;
        line-height: 24px;
        border-radius: 4px;
        outline: 0px;
        cursor: pointer;
      }
    }
  }

  .order-container {
    display: flex;
    height: 30px;
    padding: 5px;
  }

  .button-size {
    height: 24px;
    border: 1px solid ${colors.silver};
    align-self: center;
    border-radius: 4px;
    margin-right: 4px;

    .font-size {
      display: inline-flex;
      align-items: center;

      .font-family-text {
        width: 80px;
        display: inline-block;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      svg {
        font-size: 10px;
        margin-left: 4px;
        margin-bottom: 1px;
      }
    }
  }

  .font-family {
    &__list {
      max-height: 350px;
      overflow-y: auto;
    }
  }
`;

// TOPBAR COMPONENT
export const TopBarContent = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  position: relative;
  .bottomContent {
    display: flex;
    min-height: 33px;
    max-width: 100%; 
    flex-wrap: wrap;
    justify-content: center; 
    gap: 5px 0px;
    margin-bottom: 5px;
    .undo_redo {
      border-right: 1px solid #e0e0e0;
      width: 90px;
      display: flex;
      justify-content: center;
    }
    .heading {
      border-right: 1px solid #e0e0e0;
      width: 65px;
      display: flex;
      justify-content: center;
      &.size {
        border-right: none;
        align-items: center;
        &.family {
          width: 110px;
          .headingOptions {
            .list {
              width: 130px;
              left: -80px;
              height: 350px;
              overflow-x: auto;
            }
          }
        }
        .buttonSize {
          border: 1px solid #bdbdbd;
          box-sizing: border-box;
          border-radius: 4px;
          height: 24px;
        }
        .headingOptions {
          .list {
            top: 12px;
            line-height: 1;
          }
        }
      }
      .fontSize {
        svg {
          color: #8a8a8a;
          font-size: 10px;
          margin-left: 4px;
          margin-bottom: 1px;
        }
      }
      button {
        outline: none;
      }
      .headingOptions {
        position: relative;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        &.show {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.3s ease;
        }
        .list {
          position: absolute;
          top: 34px;
          background: white;
          left: -47px;
          border-radius: 5px;
          padding: 0px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          z-index: 2;

          button {
            width: 100%;
            text-align: left;
            border: none;
            /* margin-bottom: 5px; */
            padding: 5px 15px;
            cursor: pointer;
            color: #585858;
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
    .others {
      display: flex;
      align-items: center;
      position: relative;
      .alignOptions {
        position: absolute;
        top: 35px;
        background: white;
        display: flex;
        left: 35px;
        height: 30px;
        padding: 5px;
        border-radius: 4px;
        z-index: 2;
      }
    }
    .orderOptions {
      position: absolute;
      top: 80px;
      background: white;
      display: flex;
      left: 430px;
      height: 30px;
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }
  }
  .colorsOptions {
    position: absolute;
    top: 74px;
    background: white;
    left: 216px;
    width: 200px;
    height: 132px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    z-index: 3;
    .mainColors {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .colorsItems {
        width: 25px;
        height: 25px;
        margin: 3px;
        cursor: pointer;
        border-radius: 4.3px;
        border: none;
      }
    }
    .colorContainer {
      margin-top: 10px;
      position: relative;
      display: flex;
      justify-content: flex-end;
      .input-color {
        position: absolute;
        width: 136px;
        background: #8a8a8a;
        border: none;
        border-radius: 4px;
        outline: 0;
        &:after {
          content: "Pick Custom Color";
          text-align: center;
          top: 0;
          left: 0;
          position: absolute;
          background: #8a8a8a;
          width: 136px;
          height: 24px;
          color: white;
          font-weight: 600;
          font-size: 12px;
          line-height: 24px;
          border-radius: 4px;
          outline: 0;
          cursor: pointer;
        }
      }
    }
  }
`;

export const ButtonTopBar = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  font-size: 14px;
  color: #8a8a8a;
  outline: none;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;

  &.active {
    background: #eaeaea;
  }

  &.fontBG {
    /* height: 19px;
    width: 19px; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: ${colors.gray};
    border-radius: 2px;
    /* top: 7px; */
    padding: 0 4px;
    margin-left: 7px;
    margin-right: 7px;
  }
  &:active {
    color: #585858;
  }
`;
