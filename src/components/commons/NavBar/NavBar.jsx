/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'
import {  NavLink } from 'react-router-dom';
import * as styles from './NavBar.styles'

export const NavBar = () => {
    return (
        <div css={styles.nav}>
            <NavLink to={'/'} activeClassName='active'>Guided</NavLink>
            <NavLink to={'/blueprint'} activeClassName='active'>Blueprint</NavLink>
            <NavLink to={'/free-style'} activeClassName='active'>Free style</NavLink>
        </div>
    );
}

