import hexRgb from "hex-rgb";

export function hexToRgb(hex = "#000") {
  const rgb = hexRgb(hex, { format: "array" })
    .slice(0, -1)
    .join(",");

  return rgb;
}
