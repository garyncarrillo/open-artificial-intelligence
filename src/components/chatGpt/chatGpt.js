/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

//controller or integrations
import {  chatOpenAI } from '../../controllers/openAI';

const style = (width) => css`
  .MuiInputBase-input{
    width: ${width? width : '300px'};
  }

  .MuiInputBase-root {
    margin-bottom: 40px;
  }
`

function ChatGpt() {
  const [answer, setAnswer] = useState("");
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
            css={style("400px")}
          />
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue={answer}
            css={style()}
          />
          <div className='actionButton' style={{marginBottom: '50px'}}>
            <Button
               sx={{
                marginRight: "50px"
               }}
               variant="contained"
              onClick={handlerSend}
            >
              Send
            </Button>
          </div>
        </div>
      </Paper>
    </Box>

    </div>
  );
}

export default ChatGpt;
