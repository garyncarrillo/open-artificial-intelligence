/** @jsxImportSource @emotion/react */
import {Slider as SliderRange} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as styles from './Slider.styles'
import { LightTooltip } from "../../commons";

export const Slider = ({
    value=null,
    onChange=null,
    property= '',
    min=0,
    max=1,
    step=0.1,
    ...rest
}) => {
    return(
        <div css={styles.wrapper}>
           <div className="label-box">
            <span className='property'>{property}</span>
            <span className='value'>{value}</span>
           </div>
           <LightTooltip
            className="tool-tip"
            title={rest.textToolTip}
            placement={rest.positionToolTip}
            sp={{color: 'red'}}
           >
            <SliderRange
                className='slider-range'
                value={value || 0}
                onChange={onChange}
                aria-labelledby="input-slider"
                min={min}
                max={max}
                step={step}
            />
           </LightTooltip>
        </div>
    )
}
