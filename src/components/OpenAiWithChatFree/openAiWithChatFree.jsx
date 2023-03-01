/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import "../../App.css";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CircularProgress } from "@mui/material";

//controller or integrations
import { chatOpenAI, engineList, chatOpenAiBoldPromise, chatOpenAiBoldPromiseV2, chatOpenAIFree } from "../../controllers/openAI";
import { Sidebar } from "./Sidebar";

import * as styles from "./openAi.styles";
import InputWithDynamicPlaceholder from "../InputWithDynamicPlaceholder/InputWithDynamicPlaceholder";
import { Input, Button, NavBar } from "../commons";
import { Header } from "./Header";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const OpenAiWithChatFree = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [questionSelected, setQuestionSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    temperature: 0.6,
    maxLength: 256,
    max_tokens: 256,
    topP: 1,
    frecuencyPenalty: 1,
    presencePenalty: 1,
    bestOf: 1,
    optionSelected: "gpt-3.5-turbo-0301",
    questions: "",
    voiceSelected: "Casual",
    audiencesSelected: "Neutral",
    humanDesire: [],
    injectStartText: "",
    injectRestartText: "",
  });
  const [questionData, setQuestionData] = useState([]);
  const [engineOptions, setEngineOption] = useState([]);
  const [totalToken, setTotalToken] = useState(500);
  const voiceOptions = [
    { id: "Funny", label: "Funny" },
    { id: "Professional", label: "Professional" },
    { id: "Expert", label: "Expert" },
    { id: "Witty", label: "Witty" },
    { id: "Casual", label: "Casual" },
  ];

  const textAreaRef = useRef();

  const modelList = [
    { id: "gpt-3.5-turbo-0301", label: "GPT 3.5 Turbo 0301" },
    { id: "gpt-3.5-turbo", label: "GPT 3.5 Turbo" },
    { id: "text-davinci-003", label: "Davinci 003" },
    { id: "text-curie-001", label: "Curie 001" },
    { id: "text-babbage-001", label: "Babbage 001" },
    { id: "text-ada-001", label: "Ada 001" },
    { id: "code-davinci-002", label: "Code Davinci 002" },
    { id: "code-cushman-001", label: "Code Cushman 001" },
  ];

  const audiences = [
    { id: "Neutral", label: "Neutral" },
    { id: "Uninformed", label: "Uninformed" },
    { id: "Expert", label: "Expert" },
    { id: "Hostile", label: "Hostile" },
    { id: "Business", label: "Business" },
    { id: "Friendly", label: "Friendly" },
  ];


  const handleChangeData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  console.log(data);

  const fetchModels = async () => {
    const response = await engineList();
    var array = [];
    if (response) {
      response.data.data.forEach((element) => {
        array.push({ id: element.id, label: element.id });
      });
    }
    console.log(array);
    setEngineOption(array);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const lists = [
    {
      id: 0,
      description: "Top 5 most frequently asked questions in a topic ",
    },
    {
      id: 0,
      description: "Generate a promotional text of a product ",
    },
    {
      id: 1,
      description: "Generate a text with the qualities of a product ",
    },
    {
      id: 2,
      description: "Generate a testimonial about the use of a product ",
    },
    {
      id: 3,
      description: "Generate product names for a product ",
    },
  ];

  const handlerChatFree = async () => {
    console.log(textAreaRef.current)
    let question = '';
    if(!questionData.length){
      // handleChangeData('questions', textAreaRef.current.value);
      question = textAreaRef.current.innerText;
      const { response, total_tokens } = await chatOpenAIFree(data, question);
      const questionItem = {
        q: textAreaRef.current.value,
        a: response.trim(),
        tokens: total_tokens
      }
      setQuestionData([textAreaRef.current.innerText, response.trim()])
      textAreaRef.current.innerHTML = `${question}</br></br><span style="background-color: #d2f4d3">${questionItem.a}</span></br></br></br>`
    }else{
      const lines = textAreaRef.current.innerText.split('\n');
      debugger;
      const newLines = lines.filter(line=>!questionData.includes(line));
      // handleChangeData('questions',newLines.join('\n'));
      question = newLines.join('\n')
      const { response } = await chatOpenAIFree(data, question);
      // textAreaRef.current.value = `${textAreaRef.current.value}\n${response.trim()}`
      textAreaRef.current.innerHTML = `${textAreaRef.current.innerHTML}</br></br><span style="background-color: #d2f4d3">${response.trim()}</span></br></br></br>`
      setQuestionData([...questionData, ...question.split("\n"), response.trim()])
    }
    // setLoading(true);
    // const { response, total_tokens } = await chatOpenAIFree(data);
    // var newAnswer = answer+"\n"+data.questions+"\n"+response;
    // setAnswer(newAnswer);
    // setLoading(false);
  };

  const handleChange = (event) => {
    setQuestionSelected(event.target.value);
  };

  return (
    <div className="wrapperForm-im-laura" css={styles.body}>
    <NavBar />
    {/* <Link to={'/'} className='link-goto'>Go to Laura</Link> */}
      <Header />
      <div className="container container-request" css={styles.container}>
        <div className="left-side" css={styles.wrapper}>
          <div contentEditable={true} rows={20} css={css`width: 100%; padding: 10px; min-height: 300px;
          border: 1px solid gray;
          border-radius: 3px;`} ref={textAreaRef}></div>

          <Button
            disabled={loading}
            handleClick={handlerChatFree}
            className="sendButton hideOnMobile"
          />
        </div>
        <Sidebar
          totalToken={totalToken}
          data={data}
          handleChangeData={handleChangeData}
          engineOptions={engineOptions}
          voiceOptions={voiceOptions}
          modelList={modelList}
          audiences={audiences}
          handlerSend={handlerChatFree}
          loading={loading}
          answer={answer}
        />
      </div>
     <Footer />
    </div>
  );
};

export default OpenAiWithChatFree;
