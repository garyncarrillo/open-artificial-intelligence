/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { useState } from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CircularProgress } from '@mui/material';

//controller or integrations
import { createOpenAI, chatOpenAI, engineList } from '../../controllers/openAI';

const style = (width="300px", height="32px") => css`
  .MuiInputBase-input{
    width: ${width};
    height: ${height} !important;
  }

  .MuiInputBase-root {
    margin-bottom: 40px;
  }
`

const wrapper = () => css`
  padding: 30px;
  box-sizing: border-box;
  width: 650px;

  .sendButton{
    margin-bottom: 20px;
    width: 80px;
    height: 40px;
  }

  .box{
    min-width: 120m;
    width: 100%;
    margin-bottom: 20px;
  }

  .textArea {
    &.MuiFormControl-root {
      width: 90%;
    }
  }
  
  @media(max-width: 650px) {
    width: 100%;
    padding: 20px;
  }
`
const footer = css `
height: 38px;
background-color: #F2F2F2;
border-top: none;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
bottom: 0;
width: 100%;

a.text {
  display: flex;
  align-items: center;
  gap: 3.75px;
  color: #8a8a8a;
  font-size: 10px;
  text-decoration: none;
}

@media(max-height: 600px) {
  position: relative;
  margin-top: 30px;
}
`
const container = css `
  display: flex;
`



const OpenAi = () => {
  const [answer, setAnswer] = useState("");
  const [textSend, setTextSend] = useState("Send");
  const [question, setQuestion] = useState("")
  const [questionSelected, setQuestionSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const lists = [
    {
      id: 0,
      description: 'Top 10 most frequently asked questions in the topic '
    },
    {
      id: 0,
      description: 'Generate a promotional text of the product'
    },
    {
      id: 1,
      description: 'Generate a text with the qualities of the product'
    },
    {
      id: 2,
      description: 'Generate a testimonial about the use of the product'
    },
    {
      id: 3,
      description: 'Generate product names referring to'
    }
  ];

  const handlerSend = async() => {
    var newQuestion = `${questionSelected} ${question}`;
    setLoading(true);
    const response = await chatOpenAI({question: newQuestion})
    setLoading(false);
    console.log(response)
    setAnswer(response);
  }

  const handleChange = (event) => {
    setQuestionSelected(event.target.value);
  }

  return (
    <div className="wrapperForm">
      <Box css={container}
      >
      <Paper elevation={3}>
        <div className='wrapperMain' css={wrapper}>
          <h1>Chat with me</h1>
          <Box className="box">
            <FormControl fullWidth>
              <InputLabel >Questions</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={questionSelected}
                label="questionSelected"
                onChange={handleChange}
              >
                 {
                  lists.map((element, index) =>
                    <MenuItem selected value={element.description} key={element.description}>{element.description}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Box>
          <TextField
            label="Topic/product"
            variant="outlined"
            onChange={(event) => setQuestion(event.target.value)}
            css={style("250px", "")}
          />
           
            <Button
              className="sendButton"
              variant="contained"
              onClick={handlerSend}
              disabled={loading}
            >
                
              { loading ? <CircularProgress size={24} />: textSend }
            </Button>
          
          <TextField
            className="textArea"
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={answer}
            css={style("100%", "250px")}
          />
        </div>
      </Paper>
    </Box>
    <span css={footer}>
      <a className="text" href="https://bucket.io" target="_blank">
        Powered By <img src="https://preview.qa.bucketdevelopment.com/static/media/footer-icon-bucket.d09f50c4.svg" alt="logo-footer"/>
        <b>Bucket.io</b>
      </a>
    </span>
    </div>
  );
}

export default OpenAi;
