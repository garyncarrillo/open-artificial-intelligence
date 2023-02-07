/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress } from '@mui/material';

//controller or integrations
import {  chatOpenAI } from '../../controllers/openAI';
import { Sidebar } from '../Sidebar';

import * as styles from './openAi.styles'


const OpenAi = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("")
  const [questionSelected, setQuestionSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const lists = [
    {
      id: 0,
      description: 'Top 5 most frequently asked questions in a topic '
    },
    {
      id: 0,
      description: 'Generate a promotional text of a product '
    },
    {
      id: 1,
      description: 'Generate a text with the qualities of a product '
    },
    {
      id: 2,
      description: 'Generate a testimonial about the use of a product '
    },
    {
      id: 3,
      description: 'Generate product names for a product '
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
      <Paper elevation={3}>
    <div className='container' css={styles.container}>
      <Box className='box'
      >
        <div className='wrapperMain' css={styles.wrapper}>
          <h2 className="title" >Hi! I'm Laura :-)</h2>
          <h3 className="subTitle">I'm learning to answer your questions. Give me a try ...</h3>
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
            css={styles.inputs("250px", "")}
          />
           
            <Button
              className="sendButton"
              variant="contained"
              onClick={handlerSend}
              disabled={loading}
            >
                
              { loading ? <CircularProgress size={24} />: "Send" }
            </Button>
          
          <TextField
            className="textArea"
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={answer}
            css={styles.inputs("100%", "250px")}
          />
        </div>
      </Box>
    <Sidebar/>
    </div>
      </Paper>
    <span css={styles.footer}>
      <a className="text" href="https://bucket.io" target="_blank" rel="noreferrer">
        Powered By <img src="https://preview.qa.bucketdevelopment.com/static/media/footer-icon-bucket.d09f50c4.svg" alt="logo-footer"/>
        <b>Bucket.io</b>
      </a>
    </span>
    </div>
  );
}

export default OpenAi;
