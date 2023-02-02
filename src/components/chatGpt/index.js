
import React, { useState } from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Paper from '@mui/material/Paper';

//controller or integrations
import { createOpenAI, chatOpenAI, engineList } from '../../controllers/openAI';

function ChatGpt() {
  const [answer, setAnswer] = useState("");
  const [textSend, setTextSend] = useState("Send");
  const [question, setQuestion] = useState("")
  
  const handlerSend = async() => {
    const response = await chatOpenAI({question: question})
    console.log(response)
    setAnswer(response);
  }

  return (
    <div className="wrapperForm">
       <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 800,
            height: 'auto',
          },
        }}
      >
      <Paper elevation={3}>
        <div className='wrapperMain'>
          <h1>Chat with me</h1>
          <TextField
            label="question"
            variant="outlined"
            onChange={(event) => setQuestion(event.target.value)}
            sx={{
              marginBottom: "40px",
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue={answer}
            value={answer}
          />
          <div className='actionButton' style={{marginBottom: '50px'}}>
            <Button
               sx={{
                marginRight: "50px"
               }}
               variant="contained"
              onClick={handlerSend}
            >
              {textSend}
            </Button>
          </div>
        </div>
      </Paper>
    </Box>

    </div>
  );
}

export default ChatGpt;
