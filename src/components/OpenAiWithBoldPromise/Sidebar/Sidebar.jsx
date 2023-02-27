/** @jsxImportSource @emotion/react */
import SliderRange from "../../shared/sliderRange";
import { CircularProgress } from "@mui/material";
// import Button from '@mui/material/Button';

import * as styles from "./Sidebar.styles";
import { Button, Select, Slider } from "../../commons";

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
  humanDisireOptions = []
}) => {
  return (
    <div css={styles.container}>
      <Select
        label={"Human Desire"}
        options={humanDisireOptions}
        handleChangeData={handleChangeData}
        nameField={"humanDesire"}
				value={data.humanDesire}
        placeholder={'Select Human Desire'}
        multiple
      />
      <Select
        label={"Model"}
        options={modelList}
        handleChangeData={handleChangeData}
        nameField={"optionSelected"}
				value={data.optionSelected}
      />
      <Select
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
      />
      <Slider
        property="Temperature"
        value={data.temperature}
        onChange={(event) =>
          handleChangeData("temperature", event.target.value)
        }
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
