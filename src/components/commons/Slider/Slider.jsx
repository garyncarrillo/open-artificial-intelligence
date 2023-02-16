/** @jsxImportSource @emotion/react */
import {Slider as SliderRange} from '@mui/material';

import * as styles from './Slider.styles'
export const Slider = ({
    value=null,
    onChange=null,
    property= '',
    min=0,
    max=1,
    step=0.1
}) => {
    return(
        <div css={styles.wrapper}>
           <div className="label-box">
            <span className='property'>{property}</span>
            <span className='value'>{value}</span>
           </div>
           
           <SliderRange
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
