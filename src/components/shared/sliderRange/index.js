/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import Slider from '@mui/material/Slider';

const wrapper = () => css`
    display: flex;
    flex-direction: column;
    width: 200px;

    .label-box {
        display: flex;
        justify-content: space-between;

        .property {
        }

        .value {
            
        }
    }

   .slider-range {
        width: 100%;
   }
`

const SliderRange = ({
    value=null,
    onChange=null,
    property= '',
    min=0,
    max=1,
    step=0.1
}) => {
    return(
        <div css={wrapper}>
           <div className="label-box">
            <span className='property'>{property}</span>
            <span className='value'>{value}</span>
           </div>
           
           <Slider
            className='slider-range'
            value={value || 0}
            onChange={onChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            step={step}
          />
        </div>
    )
}

export default SliderRange;