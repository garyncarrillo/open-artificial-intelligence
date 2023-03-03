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
        textToolTip={"The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code."}
        positionToolTip={"top"}
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
        textToolTip={"Control randomness. Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive."}
        positionToolTip={"left"}
      />
      <Slider
        property="Maximum length"
        value={data.max_tokens}
        onChange={(event) =>
          handleChangeData("max_tokens", event.target.value)
        }
        textToolTip={"The maximum number of tokens to generate. Requests can use up to 2,048 or 4000 tokens sjared between prompt and completion. The exact limit varies by model. (One token is roughly 4 characters for normal English text)"}
        positionToolTip={"left"}
      />
      <Slider
        property="Top p"
        value={data.topP}
        onChange={(event) =>
          handleChangeData("topP", event.target.value)
        }
        textToolTip={"Controls diversity vua nucleus sampling: 0.5 means half of all likelihood-weighted option are considered."}
        positionToolTip={"left"}
      />
      <Slider
        property="Frecuency penalty"
        value={data.frecuencyPenalty}
        onChange={(event) =>
          handleChangeData("frecuencyPenalty", event.target.value)
        }
        min={0}
        max={2}
        textToolTip={"How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics."}
        positionToolTip={"left"}
      />
      <Slider
        property="Best of"
        value={data.bestOf}
        onChange={(event) =>
          handleChangeData("bestOf", event.target.value)
        }
        min={0}
        max={20}
        textToolTip={"Generate multiple completions server-side, and display only the best. Streaming only work when set to 1. Since it acts as a multipler on the number of completions, this parameters can eat into your token quota very quickly - use caution!."}
        positionToolTip={"left"}
      />
      <Slider
        property="Presence penalty"
        value={data.presencePenalty}
        onChange={(event) =>
          handleChangeData("presencePenalty", event.target.value)
        }
        min={0}
        max={2}
        textToolTip={"How much to penalize new tokens based on wheter they appear in the text so far. Increases the model's likelihood to talk about new topics."}
        positionToolTip={"left"}
      />
    </div>
  );
};
