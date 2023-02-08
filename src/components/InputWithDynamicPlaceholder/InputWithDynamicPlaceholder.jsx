import { TextField } from "@mui/material";
import { useEffect } from "react";
import { SuperPlaceholder } from "./SuperPlaceholder";

const InputWithDynamicPlaceholder = ({
    id="dynamic-placeholder",
    placeholders=["john.doe@gmail.com", "foo@bar.com"], 
    label="label", handleChangeData
}) => {
    useEffect(()=>{
        const  sp = new SuperPlaceholder({
            placeholders,
            preText: "Eg. ",
            stay: 1000,
            speed: 100,
            element: '#'+id
            });
            sp.init();
    }, [])
    
    return (
        <TextField label={label} type="text" id={id} onChange={handleChangeData} />
    );
}

export default InputWithDynamicPlaceholder;

{/* <InputWithDynamicPlaceholder placeholders={["You are a high school teacher", "You are an astronaut", "You are a business consultant"]} label="Set the Role" id='role-input' /> */}