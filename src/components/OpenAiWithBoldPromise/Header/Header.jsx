/** @jsxImportSource @emotion/react */
import Logo from '../../../assets/logo.svg'
import * as styles from './Header.styles'

export const Header = () => {
    return (
        <header css={styles.wrapper}>
            <img src={Logo} alt={"Logo"} />
            <span className='subheadline'>(Blueprint)</span>
            <span className='title'>Hi! I’m Laura ☺️ I’m here to help. Give me a try...</span>
        </header>
    );
}
