import { TextField } from "@mui/material";
import { useEffect } from "react";
import { SuperPlaceholder } from "./SuperPlaceholder";

const InputWithDynamicPlaceholder = ({
    elementId="dynamic-placeholder",
    placeholders=["john.doe@gmail.com", "foo@bar.com"], 
    label="label", 
    property='',
    value='',
    handleChangeData,
    ...rest
}) => {
    useEffect(()=>{
        const  sp = new SuperPlaceholder({
            placeholders,
            preText: "Eg. ",
            stay: 1000,
            speed: 100,
            element: '#'+elementId
            });
            sp.init();
    }, [])
    
    return (
        <TextField {...rest} label={label} type="text" id={elementId} value={value} onChange={({target})=>handleChangeData(property, target.value)} />
    );
}

export default InputWithDynamicPlaceholder;

{/* <InputWithDynamicPlaceholder placeholders={["You are a high school teacher", "You are an astronaut", "You are a business consultant"]} label="Set the Role" id='role-input' /> */}