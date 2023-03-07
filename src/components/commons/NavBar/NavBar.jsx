/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { NavLink } from "react-router-dom";
import * as styles from "./NavBar.styles";

export const NavBar = () => {
  let activeClassName = "active";
  return (
    <div css={styles.nav}>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        Guided
      </NavLink>
      <NavLink
        to={"/blueprint"}
        className={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        Blueprint
      </NavLink>
      <NavLink
        to={"/freestyle"}
        className={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        Freestyle
      </NavLink>
    </div>
  );
};
