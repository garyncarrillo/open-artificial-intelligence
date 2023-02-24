/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
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
import { chatOpenAI, engineList, chatOpenAiBoldPromise } from "../../controllers/openAI";
import { Sidebar } from "./Sidebar";

import * as styles from "./openAi.styles";
import InputWithDynamicPlaceholder from "../InputWithDynamicPlaceholder/InputWithDynamicPlaceholder";
import { Input, Button } from "../commons";
import { Header } from "./Header";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";

const OpenAiWithBoldPromise = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [questionSelected, setQuestionSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    temperature: 0.5,
    maxLength: 100,
    max_tokens: 100,
    topP: 1,
    frecuencyPenalty: 0.2,
    presencePenalty: 0,
    bestOf: 1,
    optionSelected: "text-davinci-003",
    questionWho: "",
    questionWhat: "",
    questionHow: "",
    voiceSelected: "Casual",
    audiencesSelected: "Neutral",
    humanDesire: []
  });
  const [engineOptions, setEngineOption] = useState([]);
  const [totalToken, setTotalToken] = useState(500);
  const voiceOptions = [
    { id: "Funny", label: "Funny" },
    { id: "Professional", label: "Professional" },
    { id: "Expert", label: "Expert" },
    { id: "Witty", label: "Witty" },
    { id: "Casual", label: "Casual" },
  ];

  const modelList = [
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

  const handlerSend = async () => {
    setLoading(true);
    var biggestDesireAnswer = null;
    var biggestPainAnswer = null;
    const { response, total_tokens } = await chatOpenAiBoldPromise(data, 1, biggestDesireAnswer, biggestPainAnswer);
    biggestDesireAnswer = response.replace(/(\r\n|\n|\r)/gm, " ").replace(/['"]+/g, '').replace(/\./g, '');
    biggestDesireAnswer = biggestDesireAnswer.trim();

    var twoCharacter = biggestDesireAnswer.substring(0, 2)

    if (twoCharacter.trim() == ',') {
      biggestDesireAnswer = biggestDesireAnswer.replace(",", "")
    }
    
    if (twoCharacter.trim().toLowerCase() != 'to') {
      biggestDesireAnswer = " to " +biggestDesireAnswer
    }

    console.log("ANSWER 1 <<<<=>>>> "+biggestDesireAnswer);
    
    const result = await chatOpenAiBoldPromise(data, 2, biggestDesireAnswer, biggestPainAnswer);
    biggestPainAnswer = result.response.replace(/(\r\n|\n|\r)/gm, " ").replace(/['"]+/g, '').replace(/\./g, '');
    console.log("ANSWER 2 <<<<=>>>> "+result.response)

    const result2 = await chatOpenAiBoldPromise(data, 3, biggestDesireAnswer, biggestPainAnswer);
    var biggestObjection = result2.response.replace(/(\r\n|\n|\r)/gm, " ").replace(/['"]+/g, '').replace(/\./g, '')
    console.log("ANSWER 3 <<<<=>>>> "+biggestObjection);

    setAnswer("How "+biggestDesireAnswer.toLowerCase()+", without "+biggestPainAnswer.toLowerCase()+ " even if you’ve tried and "+biggestObjection.toLowerCase());
    setLoading(false);
  };

  const handleChange = (event) => {
    setQuestionSelected(event.target.value);
  };

  return (
    <div className="wrapperForm-im-laura" css={styles.body}>
    <Link to={'/'} className='link-goto'>Go to Laura</Link>
      <Header />
      <div className="container container-request" css={styles.container}>
        <div className="left-side" css={styles.wrapper}>
          <Input
            placeholder={
              "Eg. women aged between 35 and 45 who never lost the post-baby weight"
            }
            label="WHO is it for?"
            elementId="who-input"
            property="questionWho"
            value={data.questionWho}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
          />

          <Input
            placeholder={
              "Eg. lose 20 pounds in 20 days in less than 20 minutes a day, even if you’ve struggled to lose weight and keep it off in the past"
            }
            label="WHAT are you delivering?"
            elementId="what-input"
            property="questionWhat"
            value={data.questionWhat}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
            // multiline
            // rows={3}
          />

          <Input
            placeholder={
              "Eg. 6 week online course with a Facebook Group and Q&A calls, using a new blend of crossfit and Ayurvedic medicine"
            }
            label="HOW are you delivering it?"
            elementId="how-input"
            property="questionHow"
            value={data.questionHow}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
            // multiline
            // rows={3}
          />

          <Button
            disabled={loading}
            handleClick={handlerSend}
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
          handlerSend={handlerSend}
          loading={loading}
          answer={answer}
        />
      </div>
      <div className="container-response" css={styles.container}>
        <FormControl variant="standard">
        <span className="result-label">Result</span>
          <TextField
            className="textArea"
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={answer}
            css={styles.inputs("100%", "250px")}
          />
        </FormControl>
      </div>
     <Footer />
    </div>
  );
};

export default OpenAiWithBoldPromise;
