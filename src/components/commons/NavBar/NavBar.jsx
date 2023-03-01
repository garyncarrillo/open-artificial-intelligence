/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'
import {  NavLink } from 'react-router-dom';
import * as styles from './NavBar.styles'

export const NavBar = () => {
    return (
        <div css={styles.nav}>
            <NavLink to={'/'} activeClassName='active'>Laura</NavLink>
            <NavLink to={'/bold-promise'} activeClassName='active'>Laura Bold Promise</NavLink>
            <NavLink to={'/chat-free'} activeClassName='active'>Chat Free</NavLink>
        </div>
    );
}

