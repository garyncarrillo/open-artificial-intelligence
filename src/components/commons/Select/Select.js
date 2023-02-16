/** @jsxImportSource @emotion/react */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as  MuiSelect} from '@mui/material';
import * as styles from './Select.styles'
import { BootstrapInput } from '../BootstrapInput';

export const Select = ({label, value, handleChangeData, options=[], nameField}) => {
  return (
      <FormControl variant="standard" css={styles.wrapper} >
        <InputLabel shrink id="demo-simple-select-label">{label}</InputLabel>
        <MuiSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
        //   label={label}
            input={<BootstrapInput />}
          onChange={(event, value) => handleChangeData(nameField, event.target.value)}
        >  
            {
                options.map((element, index) =>
                    <MenuItem value={element.id}>{element.label}</MenuItem>
                )
            }
        </MuiSelect>
      </FormControl>
  );
}
