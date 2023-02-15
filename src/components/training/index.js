import React, { useState } from "react";
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { trainingOpenAI } from '../../controllers/openAI';

const Training = () => {
    const [loading, setLoading] = useState(false);

    const handlerSend = async() => {
        const response = await trainingOpenAI("Horse");
        console.log("Click", response)
    }

    return (
        <div>
            Hello
            <Button
              variant="contained"
              onClick={handlerSend}
              disabled={loading}
            >
                
              { loading ? <CircularProgress size={24} />: "Send" }
            </Button>
        </div>
    )
}

export default Training;