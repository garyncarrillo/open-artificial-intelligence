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
import { chatOpenAI, engineList } from "../../controllers/openAI";
import { Sidebar } from "../Sidebar";

import * as styles from "./openAi.styles";
import InputWithDynamicPlaceholder from "../InputWithDynamicPlaceholder/InputWithDynamicPlaceholder";
import { Input, Button, NavBar } from "../commons";
import { Header } from "./Header";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";

const OpenAi = () => {
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
    role: "",
    task: "",
    context: "",
    voiceSelected: "Casual",
    audiencesSelected: "Neutral",
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

    response.data.data.forEach((element) => {
      array.push({ id: element.id, label: element.id });
    });
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
    if (totalToken <= 0) {
      alert("You don't have enough tokens");
    }
    var newQuestion = `${questionSelected} ${question}`;
    setLoading(true);
    const { response, total_tokens } = await chatOpenAI(data);
    setLoading(false);
    console.log(response);

    if (total_tokens) {
      var total = totalToken - total_tokens;
      if (total < 0) {
        total = 0;
      }
      setTotalToken(total);
    }
    setAnswer(response);
  };

  const handleChange = (event) => {
    setQuestionSelected(event.target.value);
  };

  return (
    <div className="wrapperForm-im-laura" css={styles.body}>
    <NavBar />
      <Header />
      <div className="container container-request" css={styles.container}>
        <div className="left-side" css={styles.wrapper}>
          <Input
            placeholders={[
              "You are a high school teacher",
              "You are an astronaut",
              "You are a business consultant",
            ]}
            label="Set the Role"
            elementId="role-input"
            property="role"
            value={data.role}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
          />

          <Input
            placeholders={[
              "Draft out 10 lesson ideas to make Grade 10 math interesting and entertaining for your students",
            ]}
            label="What task can I do for you?"
            elementId="task-input"
            property="task"
            value={data.task}
            handleChangeData={handleChangeData}
            css={styles.dynamicInput}
            // multiline
            // rows={3}
          />

          <Input
            placeholders={[
              "You need to focus on meeting the Mathematical Learning Standards for Grade 10 Math as outlined by the New York State Education Department. How would you amend the above list to be more in line with those standards",
            ]}
            label="Provide Context & Clarity"
            elementId="context-input"
            property="context"
            value={data.context}
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

export default OpenAi;
