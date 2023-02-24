/** @jsxImportSource @emotion/react */
import { FormControl,  InputLabel } from "@mui/material";
import { useEffect } from 'react';
import { SuperPlaceholder } from "../../../utils/Superplaceholder";
import * as styles from './Input.styles'
import { BootstrapInput } from '../BootstrapInput';



export const Input = ({elementId="dynamic-placeholder",
placeholders=["john.doe@gmail.com", "foo@bar.com"], 
label="label", 
property='',
value='',
handleChangeData,
...rest}) => {
    useEffect(()=>{
        let sp =  null;
        if(!rest.placeholder){
            sp = new SuperPlaceholder({
                placeholders,
                preText: "Eg. ",
                stay: 1000,
                speed: 100,
                element: '#'+elementId
            });
            sp.init();
        }
        return () => {
            console.log(sp);
            if(sp) {
                sp.kill();
            }
        }
    }, [])
    return (
        <FormControl variant="standard" css={styles.wrapper} >
            <InputLabel shrink htmlFor={elementId}>
            {label}
            </InputLabel>
            <BootstrapInput {...rest} id={elementId} value={value} onChange={({target})=>handleChangeData(property, target.value)} />
        </FormControl>
    );
}
