import { css } from "@emotion/react"

export const wrapper = () => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    .label-box {
			display: flex;
			justify-content: space-between;
			color: rgba(0, 0, 0, 0.7);
			.property {
				font-size: 12px;
				font-weight: 600;
			}
			.value {
				font-size: 12px;
				font-weight: 600;
			}
    }
		.MuiSlider-root{
			color: #8EBA4F;
			height: 3px;
		}
		.MuiSlider-thumb{
			width: 15px;
			height: 15px;
		}

   .slider-range {
        width: 100%;
   }
`
