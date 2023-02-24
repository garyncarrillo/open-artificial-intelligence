/** @jsxImportSource @emotion/react */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as  MuiSelect} from '@mui/material';
import * as styles from './Select.styles'
import { BootstrapInput } from '../BootstrapInput';
import CheckBox from '@mui/material/Checkbox';

export const Select = ({label, value, handleChangeData, options=[], nameField, ...rest}) => {
  const getRenderValue = (selected) =>{
    if(typeof (selected) === 'string' ){
      return selected
    }else{
      if(!selected.length)
        return  <span className='placeholder'>{rest.placeholder}</span>
      return  selected.join(', ')
    }
  }
  return (
      <FormControl variant="standard" css={styles.wrapper} >
        <InputLabel shrink id="demo-simple-select-label">{label}</InputLabel>
        <MuiSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          //   label={label}
          displayEmpty={true}
          input={<BootstrapInput />}
          onChange={(event, value) => handleChangeData(nameField, event.target.value)}
          renderValue={getRenderValue}
          {...rest}
        >  
            {
                options.map((element, index) =>
                    <MenuItem value={element.id} key={index}>
                    {rest.multiple && <CheckBox checked={value.includes(element.label)}   />}
                    <span>{element.label}</span>
                    </MenuItem>
                )
            }
        </MuiSelect>
      </FormControl>
  );
}
