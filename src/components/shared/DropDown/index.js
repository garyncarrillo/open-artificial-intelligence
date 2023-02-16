/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DropDown = ({label, value, handleChangeData, options=[], nameField}) => {

  return (
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(event, value) => handleChangeData(nameField, event.target.value)}
        >  
            {
                options.map((element, index) =>
                    <MenuItem value={element.id}>{element.label}</MenuItem>
                )
            }
        </Select>
      </FormControl>
  );
}

export default DropDown;