/** @jsxImportSource @emotion/react */
import AskLogo from '../../../assets/ask-logo.svg'
import * as styles from './Footer.styles'
const Footer = () => {
    return (
        <div css={styles.footer}>
        <div className='left-side'>
            <img src={AskLogo} alt="Ask Logo" />
        </div>
        <div className='center-side'>
            <span className='text'>
            As we all know and have previously read in fine print, unique experiences and past performances do not guarantee future results. All referenced testimonials are not intended to be representative of typical results, nor are they a guarantee or promise of any results. Rather, individual successes vary and are due to myriad factors such as effort, knowledge, techniques, timing, and experience. Please click here for our full Earnings Disclaimer.
            </span>
        </div>
        <div className='right-side'>
            <div className='content'>
                <span className='company-name'>
                    © 2023 RL & Associates LLC
                </span>
                <span className='company-trademark'>            
                    ASK Method® is a Registered Trademark
                </span>
                <span className='company-links'>
                    <a href='https://askmethod.com/contact-us/' target='_blank' rel="noreferrer">Contact</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='https://askmethod.com/privacy-policy/' target='_blank' rel="noreferrer">Privacy Policy</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='https://askmethod.com/terms-and-conditions/' target='_blank' rel="noreferrer">Terms of Service</a>
                </span>
            </div>

        </div>
       
      </div>
    );
}

export default Footer;