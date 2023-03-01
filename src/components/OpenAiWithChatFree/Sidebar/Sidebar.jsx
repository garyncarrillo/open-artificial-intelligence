/** @jsxImportSource @emotion/react */
import SliderRange from "../../shared/sliderRange";
import { CircularProgress } from "@mui/material";
// import Button from '@mui/material/Button';

import * as styles from "./Sidebar.styles";
import { Button, Select, Slider, Input } from "../../commons";
import * as stylesInput from "../openAi.styles";

export const Sidebar = ({
  data,
  handleChangeData,
  engineOptions,
  totalToken,
  voiceOptions,
  modelList,
  audiences,
  handlerSend,
  loading,
  answer,
}) => {
  return (
    <div css={styles.container}>
      <Select
        label={"Model"}
        options={modelList}
        handleChangeData={handleChangeData}
        nameField={"optionSelected"}
				value={data.optionSelected}
      />
      {/* <Select
        label={"Audience"}
        options={audiences}
        handleChangeData={handleChangeData}
        nameField={"audiencesSelected"}
				value={data.audiencesSelected}
      />
      <Select
        label={"Voice"}
        options={voiceOptions}
        handleChangeData={handleChangeData}
        nameField={"voiceSelected"}
				value={data.voiceSelected}
      /> */}
      <Slider
        property="Temperature"
        value={data.temperature}
        onChange={(event) =>
          handleChangeData("temperature", event.target.value)
        }
      />
      <Slider
        property="Maximum length"
        value={data.max_tokens}
        onChange={(event) =>
          handleChangeData("max_tokens", event.target.value)
        }
      />
      <Slider
        property="Top p"
        value={data.topP}
        onChange={(event) =>
          handleChangeData("topP", event.target.value)
        }
      />
      <Slider
        property="Frecuency penalty"
        value={data.frecuencyPenalty}
        onChange={(event) =>
          handleChangeData("frecuencyPenalty", event.target.value)
        }
        min={0}
        max={2}
      />
      <Slider
        property="Best of"
        value={data.bestOf}
        onChange={(event) =>
          handleChangeData("bestOf", event.target.value)
        }
        min={0}
        max={20}
      />
      <Slider
        property="Presence penalty"
        value={data.presencePenalty}
        onChange={(event) =>
          handleChangeData("presencePenalty", event.target.value)
        }
        min={0}
        max={2}
      />
      {/* <p>Tokens available: {totalToken}</p> */}

      <div className="containerMobile">
        <Button
          className="sendButton showOnMobile"
          disabled={loading}
          handleClick={handlerSend}
        >
          {loading ? <CircularProgress size={24} /> : "Send Request"}
        </Button>
      </div>
    </div>
  );
};
