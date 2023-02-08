/** @jsxImportSource @emotion/react */
import React from 'react'
import SliderRange from '../shared/sliderRange';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import * as styles from './Sidebar.styles'

export const Sidebar = ({ data, handleChangeData, engineOptions, totalToken, voiceOptions, modelList, audiences}) => {
    return (
        <div css={styles.container}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={audiences}
                sx={{ width: 200, height: 32}}
                renderInput={(params) => <TextField {...params} label="Audiences" />}
                onChange={(event, value) => handleChangeData('audiencesSelected', value.id)}
                value={data.audiencesSelected}
                required

            />
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={modelList}
                sx={{ width: 200, height: 32 }}
                renderInput={(params) => <TextField {...params} label="Model" />}
                onChange={(event, value) => handleChangeData('optionSelected', value.id)}
                required
            /> */}
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={voiceOptions}
                sx={{ width: 200, height: 32 }}
                renderInput={(params) => <TextField {...params} label="Voice" />}
                onChange={(event, value) => handleChangeData('voiceSelected', value.id)}
                value={data.voiceSelected}
                required
            />
            {/* <SliderRange
                property="Temperature"
                value={data.temperature}
                onChange={(event)=>handleChangeData('temperature', event.target.value)}
            /> */}
            {/* <SliderRange
                property="Maximum length"
                value={data.maxLength}
                onChange={(event)=>handleChangeData('maxLength', event.target.value)}
                min={150}
                max={4000}
                step={2}
            />
            <SliderRange
                property="Top P"
                value={data.topP}
                onChange={(event)=>handleChangeData('topP', event.target.value)}
                min={0}
                max={2}
            />
            <SliderRange
                property="Frecuency penalty"
                value={data.frecuencyPenalty}
                onChange={(event)=>handleChangeData('frecuencyPenalty', event.target.value)}
                min={0}
                max={2}
            />
            <SliderRange
                property="Presence penalty"
                value={data.presencePenalty}
                onChange={(event)=>handleChangeData('presencePenalty', event.target.value)}
                min={0}
                max={2}
            />
            <SliderRange
                property="Best of"
                value={data.bestOf}
                onChange={(event)=>handleChangeData('bestOf', event.target.value)}
                min={0}
                max={2}
            /> */}
            <p>Tokens available: {totalToken}</p>
        </div>
    );
}
