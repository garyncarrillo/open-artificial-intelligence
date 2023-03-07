/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { forwardRef } from "react";

// Styles
import * as styles from "./Paragraph.styles";

export const Paragraph = forwardRef(function(
  { tag, paragraphType, children, ...rest },
  ref,
) {
  return jsx(tag, { ...rest, css: styles[paragraphType], ref: ref }, children);
});


Paragraph.defaultProps = {
  tag: "p",
  paragraphType: "regularTitle",
};
