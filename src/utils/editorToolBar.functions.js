import { rgbToHex } from "@mui/material";

function getColors(
  items,
  preloadColors,
  customColors,
  initialColor,
  initialHighlight,
) {
  let colors = [];

  items.forEach(item => {
    const colorComputed = rgbToHex(getComputedStyle(item).color);
    const highlightComputed = rgbToHex(getComputedStyle(item).backgroundColor);

    if (
      !preloadColors.includes(colorComputed) &&
      !customColors.includes(colorComputed) &&
      colorComputed !== initialColor
    ) {
      colors = colors.concat(colorComputed);
    }

    if (
      !preloadColors.includes(highlightComputed) &&
      !customColors.includes(highlightComputed) &&
      highlightComputed !== initialHighlight
    ) {
      colors = colors.concat(highlightComputed);
    }
  });

  return colors;
}

function activateBoldByHeading(elem, setFontWeight, getFontWeight) {
  const computedFontWeight = getComputedStyle(elem)["font-weight"];
  const bold = document.querySelector(".btn[data-tag-name='b']");

  if (initialFontWeight === getFontWeight()) {
    setFontWeight(computedFontWeight);

    if (computedFontWeight === "700" || computedFontWeight === "bold") {
      bold.classList.add("active");
    } else {
      bold.classList.remove("active");

      /**
       * As this function is called recursively, we need to make sure that
       * bold option is set/unset once per element
       */
      setFontWeight("700");
    }
  }
}

export function activateByTagNames(elem, setFontWeight, getFontWeight) {
  let toolbarButton;
  const tagName = elem.tagName.toLowerCase();
  const headingRegex = /h[1-6]/;

  activateBoldByHeading(elem, setFontWeight, getFontWeight);

  toolbarButton = document.querySelectorAll(
    `.btn[data-tag-name="${tagName}"]`,
  )[0];

  if (toolbarButton) {
    toolbarButton.classList.add("active");

    if (tagName === "ol" || tagName === "ul") {
      document.querySelector(".order-list-trigger").classList.add("active");
    }

    if (headingRegex.test(tagName)) {
      document.querySelector(".heading-trigger").classList.add("active");
    }
  }
}

export function activateByAlignment(elem) {
  let toolbarButton;
  const textAlign = elem.style.textAlign || elem.align;

  toolbarButton = document.querySelectorAll(
    `.btn[data-style="textAlign:${textAlign}"]`,
  )[0];

  if (toolbarButton) {
    toolbarButton.classList.add("active");
    document.querySelector(".alignment-trigger").classList.add("active");
  }
}

export function activateByColor(elem, setColor, getColor) {
  let toolbarButton;
  const computedColor = getComputedStyle(elem)["color"];
  const hex = rgbToHex(computedColor);
  toolbarButton = document.querySelectorAll(`.btn[data-color="${hex}"]`)[0];

  /**
   * As this is call in a recursive function, we only set the color one time per
   * elem
   */
  if (initialColor === getColor()) {
    setColor(hex);

    if (toolbarButton) {
      toolbarButton.classList.add("active");
    }
  }

  document.querySelector(".color-preview").style.backgroundColor = getColor();
}

export function activateByHighlight(elem, setHighlight, getHighlight) {
  let toolbarButton;
  const computedHighlight = getComputedStyle(elem)["background-color"];
  const hex = rgbToHex(computedHighlight);
  toolbarButton = document.querySelectorAll(`.btn[data-highlight="${hex}"]`)[0];

  /**
   * As this is call in a recursive function, we only set the color one time per
   * elem
   */
  if (initialHighlight === getHighlight()) {
    setHighlight(hex);
  }

  document.querySelector(
    ".highlight-preview",
  ).style.backgroundColor = getHighlight();

  if (toolbarButton) {
    toolbarButton.classList.add("active");
  }
}

export function activateByFontSize(elem, setFontSize, getFontSize) {
  let toolbarButton;
  let computedFontSize = `${parseInt(getComputedStyle(elem)["font-size"])}px`;
  toolbarButton = document.querySelectorAll(
    `.btn[data-size="${computedFontSize}"]`,
  )[0];

  if ("16px" === getFontSize()) {
    setFontSize(computedFontSize);

    if (toolbarButton) {
      toolbarButton.classList.add("active");
    }
  }

  document.querySelector(".font-size-text").textContent = getFontSize();
}

export function activateByFontFamily(elem, setFontFamily, getFontFamily) {
  let toolbarButton;
  const computedFontFamily = getComputedStyle(elem)["font-family"].replace(
    /"/g,
    "",
  );
  toolbarButton = document.querySelectorAll(
    `.btn[data-family="${computedFontFamily}"]`,
  )[0];

  if ("Open Sans, sans-serif" === getFontFamily()) {
    setFontFamily(computedFontFamily);

    if (toolbarButton) {
      toolbarButton.classList.add("active");
    }
  }

  document.querySelector(
    ".font-family-text",
  ).textContent = getFontFamily().split(",")[0];
}

export function getQuestionColors(
  domSelector,
  preloadColors,
  customColors,
  initialColor,
  initialHighlight,
) {
  const selector = document.querySelector(domSelector);
  const selectorChildren = selector.querySelectorAll("*");

  return getColors(
    selectorChildren,
    preloadColors,
    customColors,
    initialColor,
    initialHighlight,
  );
}

export function getOptionChoicesColors(
  domSelector,
  preloadColors,
  customColors,
  initialColor,
  initialHighlight,
) {
  const optionChoices = document.querySelectorAll(domSelector);
  let colors = [];

  optionChoices.forEach(choice => {
    const choiceChildren = choice.querySelectorAll("*");

    colors = colors.concat(
      getColors(
        choiceChildren,
        preloadColors,
        customColors,
        initialColor,
        initialHighlight,
      ),
    );
  });

  return colors;
}

export function isSomethingSelected() {
  return !!window.getSelection().toString();
}

export const sanitizeConfTitle = {
  allowedTags: [],
  allowedAttributes: {},
};

export const arrayConst = [
  "#ffd453",
  "#ffc353",
  "#ffaf53",
  "#ff8753",
  "#ff6753",
  "#ff537b",
  "#d34ba6",
  "#aa45bc",
  "#8145bc",
  "#5745bc",
  "#4e67e6",
  "#5096ff",
  "#73d5ff",
  "#73ffce",
  "#39d075",
  "#5aae26",
  "#000000",
  "#333333",
  "#8a8a8a",
  "#e0e0e0",
  "#ffffff",
];

export const itemSize = [
  {
    value: "8px",
    label: "8px",
    size: 1,
  },
  {
    value: "9px",
    label: "9px",
    size: 1,
  },
  {
    value: "10px",
    label: "10px",
    size: 1,
  },
  {
    value: "11px",
    label: "11px",
    size: 1,
  },
  {
    value: "12px",
    label: "12px",
    size: 1,
  },
  {
    value: "13px",
    label: "13px",
    size: 2,
  },
  {
    value: "14px",
    label: "14px",
    size: 2,
  },
  {
    value: "16px",
    label: "16px",
    size: 4,
  },
  {
    value: "18px",
    label: "18px",
    size: 4,
  },
  {
    value: "24px",
    label: "24px",
    size: 5,
  },
  {
    value: "30px",
    label: "30px",
    size: 6,
  },
  {
    value: "32px",
    label: "32px",
    size: 6,
  },
  {
    value: "36px",
    label: "36px",
    size: 6,
  },
  {
    value: "48px",
    label: "48px",
    size: 7,
  },
  {
    value: "60px",
    label: "60px",
    size: 7,
  },
  {
    value: "72px",
    label: "72px",
    size: 7,
  },
  {
    value: "96px",
    label: "96px",
    size: 7,
  },
];

export const itemFamily = [
  { value: "Abril Fatface, cursive", label: "Abril Fatface" },
  { value: "Allan, cursive", label: "Allan" },
  {
    value: "Arial Black, Gadget, sans-serif",
    label: "Arial Black",
  },
  { value: "Arial, Helvetica, sans-serif", label: "Arial" },
  { value: "Bebas Neue, cursive", label: "Bebas Neue" },
  {
    value: "Brush Script MT, sans-serif",
    label: "Brush Script MT",
  },
  {
    value: "Comic Sans MS, cursive, sans-serif",
    label: "Comic Sans MS",
  },
  {
    value: "Courier New, Courier, monospace",
    label: "Courier New",
  },
  { value: "Dekko, cursive", label: "Dekko" },
  { value: "Fredoka One, cursive", label: "Fredoka One" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Helvetica, serif", label: "Helvetica" },
  { value: "Impact, Charcoal, sans-serif", label: "Impact" },
  { value: "Lato, sans-serif", label: "Lato" },
  {
    value: "Lucida Sans Unicode, Lucida Grande, sans-serif",
    label: "Lucida Sans Unicode",
  },
  { value: "Merriweather, serif", label: "Merriweather" },
  { value: "Montaga, serif", label: "Montaga" },
  { value: "Open Sans, sans-serif", label: "Open Sans" },
  { value: "Passion One, cursive", label: "Passion One" },
  { value: "Playball, cursive", label: "Playball" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  {
    value: "Roboto Condensed, sans-serif",
    label: "Roboto Condensed",
  },
  {
    value: "Sansita Swashed, cursive",
    label: "Sansita Swashed",
  },
  { value: "Seaweed Script, cursive", label: "Seaweed Script" },
  { value: "Tahoma, Geneva, sans-serif", label: "Tahoma" },
  {
    value: "Times New Roman, Times, serif",
    label: "Times New Roman",
  },
  {
    value: "Trebuchet MS, Helvetica, sans-serif",
    label: "Trebuchet MS",
  },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
];

export const headings = [
  {
    value: "p",
    action: "Paragraph",
  },
  {
    value: "h1",
    action: "Header1",
  },
  {
    value: "h2",
    action: "Header2",
  },
  {
    value: "h3",
    action: "Header3",
  },
  {
    value: "h4",
    action: "Header4",
  },
  {
    value: "h5",
    action: "Header5",
  },
  {
    value: "h6",
    action: "Header6",
  },
];

export const initialColor = "#000000";

// export const initialHighlight = "rgba(0, 0, 0, 0)";
export const initialHighlight = "#00000000";

export const initialFontSize = "16px";

export const initialFontFamily = "Open Sans, sans-serif";

export const initialFontWeight = "400";
