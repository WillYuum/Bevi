import colOf6 from "../public styles/colOf6.module.scss";
import colOf4 from "../public styles/colOf4.module.scss";
import colOf3 from "../public styles/colOf3.module.scss";

/**
 * @function checkColSize
 * @param {int} size - represents the amount of colomns
 */
export const checkColSize = size => {
  if (size === "3") {
    return colOf3.hex;
  } else if (size === "4") {
    return colOf4.hex;
  } else {
    return colOf6.hex;
  }
};
