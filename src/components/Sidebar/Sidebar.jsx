/** @jsxImportSource @emotion/react */
import React from 'react'
import SliderRange from '../shared/sliderRange';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DropDown from '../shared/DropDown';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

import * as styles from './Sidebar.styles'
import * as styles2 from '../openAi/openAi.styles'

export const Sidebar = ({
            data,
            handleChangeData,
            engineOptions,
            totalToken, voiceOptions,
            modelList,
            audiences,
            handlerSend,
            loading,
            answer
        }) => {
    return (
        <div css={styles.container}>
            <DropDown
                label={'Model'}
                options={modelList}
                handleChangeData={handleChangeData}
                nameField={'optionSelected'}
            />
            <DropDown
                label={'Audience'}
                options={audiences}
                handleChangeData={handleChangeData}
                nameField={'audiencesSelected'}
            />
            <DropDown
                label={'Voice'}
                options={voiceOptions}
                handleChangeData={handleChangeData}
                nameField={'voiceSelected'}
            />
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={modelList}
                sx={{ width: 200, height: 32 }}
                renderInput={(params) => <TextField {...params} label="Model" />}
                onChange={(event, value) => handleChangeData('optionSelected', value.id)}
                value={data.optionSelected}
                required
            /> */}
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={audiences}
                sx={{ width: 200, height: 32}}
                renderInput={(params) => <TextField {...params} label="Audience" />}
                onChange={(event, value) => handleChangeData('audiencesSelected', value.id)}
                value={data.audiencesSelected}
                required

            /> */}
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={voiceOptions}
                sx={{ width: 200, height: 32 }}
                renderInput={(params) => <TextField {...params} label="Voice" />}
                onChange={(event, value) => handleChangeData('voiceSelected', value.id)}
                value={data.voiceSelected}
                required
            /> */}
            <SliderRange
                property="Temperature"
                value={data.temperature}
                onChange={(event)=>handleChangeData('temperature', event.target.value)}
            />
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
            
            <div className='containerMobile'>
                <Button
                    className="sendButton showOnMobile"
                    variant="contained"
                    onClick={handlerSend}
                    disabled={loading}
                >
                    
                    { loading ? <CircularProgress size={24} />: "Send" }
                </Button>
                    
                <TextField
                    className="textArea showOnMobile"
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    defaultValue={answer}
                    css={styles2.inputs("100%", "250px")}
                />
            </div>     
        </div>
    );
}
