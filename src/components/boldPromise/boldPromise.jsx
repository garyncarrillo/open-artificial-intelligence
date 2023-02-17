/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
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
import {  boldPromiseOpenAI, engineList } from '../../controllers/openAI';
import { Sidebar } from '../shared/Sidebar';

import * as styles from './boldPromise.styles'
import InputWithDynamicPlaceholder from '../InputWithDynamicPlaceholder/InputWithDynamicPlaceholder';


const BoldPromise = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("")
  const [questionSelected, setQuestionSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    temperature: 0.3,
    maxLength: 100,
    max_tokens: 100,
    topP: 1,
    frecuencyPenalty: 0.2,
    presencePenalty: 0,
    bestOf: 1,
    optionSelected: 'text-davinci-003',
    questionWho: '',
    questionWhat: '',
    questionHow: '',
    voiceSelected: 'Casual',
    audiencesSelected: 'Neutral',
    humanDiseresSelected: []
  });
  const [engineOptions, setEngineOption] = useState([])
  const [totalToken, setTotalToken] = useState(500)
  const voiceOptions = [
    {id: 'Funny', label: 'Funny'},
    {id: 'Professional', label: 'Professional'},
    {id: 'Expert', label: 'Expert'},
    {id: 'Witty', label: 'Witty'},
    {id: 'Casual', label: 'Casual'}
  ];

  const modelList = [
    {id: 'text-davinci-003', label: 'Davinci 003'},
    {id: 'text-curie-001', label: 'Curie 001'},
    {id: 'text-babbage-001', label: 'Babbage 001'},
    {id: 'text-ada-001', label: 'Ada 001'},
    {id: 'code-davinci-002', label: 'Code Davinci 002'},
    {id: 'code-cushman-001', label: 'Code Cushman 001'}
  ];

  const audiences = [
    {id: 'Neutral', label: 'Neutral'},
    {id: 'Uninformed', label: 'Uninformed'},
    {id: 'Expert', label: 'Expert'},
    {id: 'Hostile', label: 'Hostile'},
    {id: 'Business', label: 'Business'},
    {id: 'Friendly', label: 'Friendly'},
  ];

  const humanDisireOptions = [
    {id: 'Survival', label: 'Survival'},
    {id: 'Pleasure', label: 'Pleasure'},
    {id: 'Freedom', label: 'Freedom'},
    {id: 'Relationships', label: 'Relationships'},
    {id: 'Success', label: 'Success'},
    {id: 'Care & Protection', label: 'Care & Protection'},
    {id: 'Likability', label: 'Likability'}
  ];

  const handleChangeData = (key, value) => {
    setData({...data, [key]: value})
  }

  console.log(data);
  
  const fetchModels = async() => {
    const response = await engineList();
    var array  = []

    response.data.data.forEach((element) => {
      array.push({id: element.id, label: element.id})
    });
    console.log(array)
    setEngineOption(array)
  }

  useEffect(() =>{
    //fetchModels();
  },[]);

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
    if (totalToken <= 0) {
      alert("You don't have enough tokens")
    }
    var newQuestion = `${questionSelected} ${question}`;
    setLoading(true);
    const {response, total_tokens} = await boldPromiseOpenAI(data, 1)
    console.log(response)

    if(total_tokens) {
      var total = totalToken - total_tokens;
      if (total < 0) {
        total = 0
      }
      setTotalToken(total);
    }

    var result = await boldPromiseOpenAI(data, 2);
    if(result.total_tokens) {
      var total = totalToken - result.total_tokens;
      if (total < 0) {
        total = 0
      }
      setTotalToken(total);
    }

    var resultQuestion = await boldPromiseOpenAI(data, 3);
    if(resultQuestion.total_tokens) {
      var total = totalToken - resultQuestion.total_tokens;
      if (total < 0) {
        total = 0
      }
      setTotalToken(total);
    }

    setLoading(false);

    var desire = response.replace(/(\r\n|\n|\r)/gm, "").replace(/['"]+/g, '').replace(/\./g, '')
    var pain = result.response.replace(/(\r\n|\n|\r)/gm, "").replace(/['"]+/g, '').replace(/\./g, '')
    var objection = resultQuestion.response.replace(/(\r\n|\n|\r)/gm, "").replace(/['"]+/g, '').replace(/\./g, '')
    setAnswer("How to "+desire.toLowerCase()+" without "+pain.toLowerCase()+ " even if you’ve tried and "+objection.toLowerCase());

    console.log("biggest objection =>>>>   "+resultQuestion.response)
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
          <h3 className="subTitle">This week I'm learning to be helpful with more general tasks. Give me a try ...</h3>
          {/* <Box className="box">
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
          </Box> */}


          <InputWithDynamicPlaceholder 
            placeholders={["Ideal Client", "Market Niche", "Women aged between 35 and 45"]} 
            label="WHO is it for?" 
            elementId='who-input'
            property='questionWho'
            value={data.questionWho}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
          /> 

          <InputWithDynamicPlaceholder 
            placeholders={["want lose weight"]} 
            label="WHAT are you delivering?" 
            elementId='what-input'
            property='questionWhat'
            value={data.questionWhat}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
            multiline
            rows={3}
          /> 

          <InputWithDynamicPlaceholder 
            placeholders={["through an online course"]} 
            label="HOW are you delivering it?" 
            elementId='how-input'
            property='questionHow'
            value={data.questionHow}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
            multiline
            rows={3}
          /> 


          {/* <TextField
            label="Topic/product"
            variant="outlined"
            onChange={(event) => setQuestion(event.target.value)}
            css={styles.inputs("250px", "")}
          /> */}
           
            <Button
              className="sendButton hideOnMobile"
              variant="contained"
              onClick={handlerSend}
              disabled={loading}
            >
                
              { loading ? <CircularProgress size={24} />: "Send" }
            </Button>
          
          <TextField
            className="textArea hideOnMobile"
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={answer}
            css={styles.inputs("100%", "250px")}
          />
        </div>
      </Box>
    <Sidebar
      totalToken={totalToken}
      data={data} handleChangeData={handleChangeData}
      engineOptions={engineOptions}
      voiceOptions={voiceOptions}
      modelList={modelList}
      audiences={audiences}
      handlerSend={handlerSend}
      loading={loading}
      answer={answer}
      humanDisireOptions={humanDisireOptions}
      humanDiseresSelected={data.humanDiseresSelected}
    />
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

export default BoldPromise;
