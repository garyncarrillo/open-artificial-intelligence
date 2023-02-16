/** @jsxImportSource @emotion/react */
import { Button as MuiButton, CircularProgress } from "@mui/material";
import * as styles from './Button.styles'

export const Button = ({disabled, handleClick, ...rest}) => {
    return (
        <MuiButton css={styles.button} {...rest} onClick={handleClick} variant="contained" disabled={disabled}>
        <span className="button-text">
            { disabled ? <CircularProgress size={24} />: "Send Request" }
        </span>
        </MuiButton>
    );
}
