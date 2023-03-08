/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect,  useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import { TopBarContent, ButtonTopBar, Trigger } from "./EditorToolbar.styles";
// import ColorPicker from "./ColorPicker";
import { LightTooltip as Tooltip } from "../commons";

// Assets
// import imgHeadingTopBar from "../../assets/icon-editor-toolbar-heading.svg";
import imgOrderTopBar from "../../assets/icon-editor-toolbar-list.svg";
// import imgHeadingTopBar from "../../assets/icon-editor-toolbar-heading.svg";
import imgAlignTextTopBar from "../../assets/icon-editor-toolbar-align-text.svg";

// Utils

import {
  activateByTagNames,
  activateByAlignment,
  activateByColor,
  activateByHighlight,
  activateByFontSize,
  activateByFontFamily,
  getOptionChoicesColors,
  arrayConst,
  itemSize,
  itemFamily,
  initialColor,
  initialHighlight,
  initialFontSize,
  initialFontFamily,
  initialFontWeight,
  isSomethingSelected,
} from "../../utils/editorToolBar.functions";



export function EditorToolbar(props) {
  let color = null;
  let highlight = null;
  let fontSize = null;
  let fontFamily = null;
  let fontWeight = null;
  const [customColors, setCustomColors] = useState([]);

  useEffect(() => {
    document.addEventListener("selectionchange", selectionChange);

    return () => {
      document.removeEventListener("selectionchange", selectionChange);
    };
  }, []);

  useEffect(() => {
    let customColorsCopy = [...customColors];
    const optionChoicesColors = getOptionChoicesColors(
      ".setting-info",
      arrayConst,
      customColorsCopy,
      initialColor,
      initialHighlight
    );

    // Filter out duplicates color
    const uniqueItems = optionChoicesColors.filter((val, idx, self) => {
      return self.indexOf(val) === idx;
    });

    setCustomColors(uniqueItems);
  }, [props.data]);

  function resetRemainingToolbarItems() {
    document.querySelector(".color-preview").style.backgroundColor =
      initialColor;
    document.querySelector(".highlight-preview").style.backgroundColor =
      initialHighlight;
    document.querySelector(".font-size-text").textContent = "Size";
    document.querySelector(".font-family-text").textContent = "Font Family";
  }

  function parentTagActive(elem) {
    const mainSlideQuestion = document.querySelector(
      ".content-editables-holder"
    );

    if (mainSlideQuestion.contains(elem)) {
      if (elem.classList.contains("content-editables-holder")) return false;

      // active by tag names
      activateByTagNames(elem, setFontWeight, getFontWeight);

      // active by text-align
      activateByAlignment(elem);

      // active by color
      activateByColor(elem, setColor, getColor);

      // active by highlight
      activateByHighlight(elem, setHighlight, getHighlight);

      // active by font size
      activateByFontSize(elem, setFontSize, getFontSize);

      // active by font family
      activateByFontFamily(elem, setFontFamily, getFontFamily);

      return parentTagActive(elem.parentNode);
    } else {
      resetRemainingToolbarItems();
    }
  }

  function renderColorComponent({ color, action, index, ...rest }) {
    return (
      <button
        {...rest}
        key={index}
        className={`btn color-item ${color === "#ffffff" && "is-white"}`}
        css={css`
          background-color: ${color};
        `}
        onMouseDown={(e) => {
          e.preventDefault();
          document.execCommand(action, false, color);
          dispatchSelectionChange();
        }}
      />
    );
  }

  function selectionChange() {
    const toolbar = document.getElementsByClassName("bottomContent")[0];
    const buttons = toolbar.querySelectorAll(".btn:not(.has-submenu)");
    const selection = window.getSelection;
    // Reset variables on every change
    color = initialColor;
    highlight = initialHighlight;
    fontSize = initialFontSize;
    fontFamily = initialFontFamily;
    fontWeight = initialFontWeight;
    document.querySelector(".order-list-trigger").classList.remove("active");
    document.querySelector(".alignment-trigger").classList.remove("active");
    document.querySelector(".font-size-text").textContent = fontSize;
    document.querySelector(".font-family-text").textContent = fontFamily;

    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.classList.remove("active");
    }

    if (selection) {
      let parentNode = null;
      if (
        navigator.userAgent.toLowerCase().match(/(?:firefox|fxios)\/(\d+)/) !==
        null
      ) {
        parentNode = selection().focusNode.parentNode;
        parentTagActive(parentNode);

        return;
      }

      parentNode = selection().anchorNode.parentNode;
      parentTagActive(parentNode);
    }
  }

  function dispatchSelectionChange() {
    const evt = new Event("selectionchange");
    document.dispatchEvent(evt);
  }

  function getColor() {
    return color;
  }

  function setColor(value) {
    color = value;
  }

  function getHighlight() {
    return highlight;
  }

  function setHighlight(value) {
    highlight = value;
  }

  function getFontSize() {
    return fontSize;
  }

  function setFontSize(font) {
    fontSize = font;
  }

  function getFontFamily() {
    return fontFamily;
  }

  function setFontFamily(font) {
    fontFamily = font;
  }

  function getFontWeight() {
    return fontWeight;
  }

  function setFontWeight(weight) {
    fontWeight = weight;
  }

  return (
    <TopBarContent>
      <div className="bottomContent">
        <Trigger>
          <ButtonTopBar
            className="color-preview-container"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            <Tooltip title={`Font Color`} placement="top">
              <span>
                <FontAwesomeIcon icon={["far", `font`]} />
              </span>
            </Tooltip>

            <div className="color-preview" />
          </ButtonTopBar>

          <div className="colors-container dropdown">
            <div className="colors">
              {arrayConst.map((val, index) => {
                return renderColorComponent({
                  index,
                  color: val,
                  action: "foreColor",
                  "data-color": val,
                });
              })}
            </div>


            <div className="custom-colors colors">
              {customColors.map((val, index) => {
                return renderColorComponent({
                  index,
                  color: val,
                  action: "forecolor",
                  "data-color": val,
                });
              })}
            </div>
          </div>
        </Trigger>

        <Trigger>
          <ButtonTopBar
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            className="color-preview-container fontBG"
          >
            <Tooltip title={`Highlight`} placement="top">
              <span>
                <FontAwesomeIcon icon={["far", `fa-highlighter`]} />
              </span>
            </Tooltip>

            <div className="highlight-preview" />
          </ButtonTopBar>

          <div className="colors-container dropdown">
            <div className="colors">
              {arrayConst.map((val, index) => {
                return renderColorComponent({
                  index,
                  color: val,
                  action: "backColor",
                  "data-highlight": val,
                });
              })}
            </div>

            <div className="custom-colors colors">
              {customColors.map((val, index) => {
                return renderColorComponent({
                  index,
                  color: val,
                  action: "backColor",
                  "data-highlight": val,
                });
              })}
            </div>
          </div>
        </Trigger>

        <Trigger className="alignment-trigger">
          <ButtonTopBar>
            <Tooltip title={"Alignment"} placement="top">
              <img src={imgAlignTextTopBar} alt={imgAlignTextTopBar} />
            </Tooltip>
          </ButtonTopBar>

          <div className="align-options dropdown">
            <EditButton
              cmd="justifyLeft"
              icon="align-left"
              action="Align left"
              disp={dispatchSelectionChange}
              className="btn"
              dataStyle="textAlign:left"
            />
            <EditButton
              cmd="justifyCenter"
              icon="align-center"
              action="Align center"
              disp={dispatchSelectionChange}
              className="btn"
              dataStyle="textAlign:center"
            />
            <EditButton
              cmd="justifyRight"
              icon="align-right"
              action="Align right"
              disp={dispatchSelectionChange}
              className="btn"
              dataStyle="textAlign:right"
            />
            <EditButton
              cmd="justifyFull"
              icon="align-justify"
              action="Align justify"
              disp={dispatchSelectionChange}
              className="btn"
              dataStyle="textAlign:justify"
            />
          </div>
        </Trigger>

        <EditButton
          cmd="bold"
          iconType="fas"
          disp={dispatchSelectionChange}
          icon="bold"
          action="Bold"
          className="btn"
          tagName="b"
        />

        <EditButton
          cmd="italic"
          disp={dispatchSelectionChange}
          icon="italic"
          action="Italic"
          className="btn"
          tagName="i"
        />

        <EditButton
          cmd="underline"
          disp={dispatchSelectionChange}
          icon="underline"
          action="Underline"
          className="btn"
          tagName="u"
        />

        <EditButton
          cmd="strikeThrough"
          disp={dispatchSelectionChange}
          icon="strikethrough"
          action="StrikeThrough"
          className="btn"
          tagName="strike"
        />

        <Trigger className="order-list-trigger">
          <ButtonTopBar>
            <Tooltip title={"Order List"} placement="top">
              <img src={imgOrderTopBar} alt={imgOrderTopBar} />
            </Tooltip>
          </ButtonTopBar>

          <div className="order-container dropdown">
            <EditButton
              cmd="insertOrderedList"
              disp={dispatchSelectionChange}
              icon="list-ol"
              // action="Order List"
              className="btn"
              tagName="ol"
            />
            <EditButton
              cmd="insertUnorderedList"
              disp={dispatchSelectionChange}
              icon="list"
              // action="Unorder List"
              className="btn"
              tagName="ul"
            />
          </div>
        </Trigger>

        <Trigger>
          <ButtonTopBar
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            className="button-size"
          >
            <Tooltip title={"Font size"} placement="top">
              <span className="font-size">
                <span className="font-size-text">Size</span>
                <FontAwesomeIcon icon={["far", `caret-down`]} />
              </span>
            </Tooltip>
          </ButtonTopBar>

          <div className="headingOptions dropdown">
            <div className="list">
              {itemSize.map((val) => {
                return (
                  <OptionHeadingList
                    key={val.value}
                    class="p btn heading-list__item"
                    action={val.label}
                    cmd="fontSize"
                    arg={val.value}
                    dataSize={val.label}
                    size={val.size}
                    disp={dispatchSelectionChange}
                  />
                );
              })}
            </div>
          </div>
        </Trigger>

        <Trigger>
          <ButtonTopBar
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            className="button-size"
          >
            <Tooltip title={"Font family"} placement="top">
              <span className="font-size">
                <span className="font-family-text">Font Family</span>
                <FontAwesomeIcon icon={["far", `caret-down`]} />
              </span>
            </Tooltip>
          </ButtonTopBar>

          <div className="font-family-container dropdown">
            <div className="font-family__list">
              {itemFamily.map((val) => {
                return (
                  <OptionHeadingList
                    key={val.value}
                    class="p btn heading-list__item"
                    family={val.value}
                    action={val.label}
                    cmd="fontName"
                    arg={val.value}
                    dataFamily={val.value.replace(/"/g, "")}
                    disp={dispatchSelectionChange}
                  />
                );
              })}
            </div>
          </div>
        </Trigger>
      </div>

  
    </TopBarContent>
  );
}

function EditButton(props) {
  return (
    <ButtonTopBar
      className={props.className}
      data-tag-name={props.tagName}
      data-style={props.dataStyle}
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        if (isSomethingSelected()) {
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
          props.disp();
          props.resetButtons && props.resetButtons();
        }
      }}
    >
      <Tooltip title={props.action} placement="top">
        <span>
          <FontAwesomeIcon icon={["far", `${props.icon}`]} />
        </span>
      </Tooltip>
    </ButtonTopBar>
  );
}

const OptionList = styled.button`
  background-color: transparent;
  color: #6b717a;
  font-family: ${(props) => props.family};

  &.active {
    background: #eaeaea;
  }

  &.h1 {
    font-size: 36px;
  }
  &.h2 {
    font-size: 26px;
  }
  &.h3 {
    font-size: 24px;
  }
  &.h4 {
    font-size: 18px;
  }
  &.h5 {
    font-size: 14px;
  }
  &.h6 {
    font-size: 12px;
  }
  &.p {
    font-size: 13px;
  }
`;
function OptionHeadingList(props) {
  function changeFontSize() {
    document.execCommand(props.cmd, false, props.size); // Send the command to the browser

    setTimeout(() => {
      const fontElements = document.querySelector(`font[size='${props.size}']`);

      Array.from(fontElements.children).forEach((item) => {
        item.style.fontSize = props.arg;
      });

      fontElements.removeAttribute("size");
      fontElements.style.fontSize = props.arg;

      /**
       * As we are setting the font size to 4 per change and then removing
       * the size attr in order to add the font-size attr, this timeout
       * is triggering a new change that updates the selected font in the
       * font size dropdown
       */
      setTimeout(() => {
        props.disp();
      }, 50);
    }, 0);
  }

  return (
    <OptionList
      key={props.cmd}
      data-size={props.dataSize}
      data-family={props.dataFamily}
      data-tag-name={props.tagName}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        if (isSomethingSelected()) {
          if (props.cmd === "fontSize") {
            changeFontSize();

            return;
          }

          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser

          props.disp();
        }
      }}
      className={props.class}
      family={props.family}
    >
      {props.action}
    </OptionList>
  );
}
