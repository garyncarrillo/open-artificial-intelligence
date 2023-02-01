import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createOpenAI } from './controllers/openAI'

function App() {
  const [textButton, setTextButton] = useState("Next");
  const [textButtonPreviou, setTextButtonPreviou] = useState("Back");
  const [textSend, setTextSend] = useState("Send");
  const [step, setStep] = useState(0);
  const questions = [
                      {
                        id: 0,
                        tittle: "Question 1?",
                        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                      },
                      {
                        id: 0,
                        tittle: "Question 2?",
                        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                      },
                      {
                        id: 0,
                        tittle: "Question 3?",
                        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                      },
                      {
                        id: 0,
                        tittle: "Question 4?",
                        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                      }
                    ];
  
  const handlerNext = () => {
    if ((step + 1) < questions.length){
      setStep(step + 1);
    } else {
      setTextButton("Finish")
    }
  }

  const handlerBack = () => {
    if (step > 0){
      setStep(step - 1);
      setTextButton("Next")
    }
  }

  const handlerSend = async() => {
      await createOpenAI({description: 'Dog'})
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
          <h1>{questions[step].tittle}</h1>
          <p className='description'>{questions[step].description}</p>
          <TextareaAutosize
            placeholder="Empty"
            style={{ width: 200, height: 200, marginBottom: '20px' }}
          />
          <div className='actionButton' style={{marginBottom: '50px'}}>
            <Button
               sx={{
                marginRight: "50px"
               }}
              disabled={ step > 0? false : true}
              variant="contained"
              onClick={handlerBack}
            >
              {textButtonPreviou}
            </Button>
            <Button
               sx={{
                marginRight: "50px"
               }}
              variant="outlined"
              onClick={handlerSend}
            >
              {textSend}
            </Button>
            <Button
              variant="contained"
              onClick={handlerNext}
            >
              {textButton}
            </Button>
          </div>
        </div>
      </Paper>
    </Box>

    </div>
  );
}

export default App;
