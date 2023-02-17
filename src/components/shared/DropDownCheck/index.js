/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const DropDownCheck = ({label, value, handleChangeData, options=[], nameField, multiple=false}) => {
  console.log(options)
  console.log(value)
  return (
    <Box sx={{ minWidth: 200, marginBottom: '20px', maxWidth: '200px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={(event, value) => handleChangeData(nameField, event.target.value)}
          multiple={multiple}
          renderValue={(selected) => selected.join(', ')}
        >  
            {
                options.map((element, index) =>
                    <MenuItem key={element.id} value={element.id}>
                        <Checkbox checked={value.includes(element.label)} />
                        <ListItemText primary={element.label} />
                    </MenuItem>
                )
            }
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDownCheck;