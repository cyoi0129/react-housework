import { VFC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterList, selectMaster, masterObject } from "../models/Master";
import { Box, TextField, InputLabel, MenuItem, FormControl, Slider, Select, SelectChangeEvent, Typography, Button } from '@mui/material';

export type Props = {
  master: masterObject;
}

const MasterEdit: VFC<Props> = (Props) => {
  const { master } = Props;
  const [name, setName] = useState<string>(master.name);
  const [type, setType] = useState<string>(master.type);
  const [point, setPoint] = useState<number>(master.point);
  const masterList = useAppSelector(selectMaster);
  const masters: masterObject[] = masterList.masters;
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handlePointChange = (event: Event, newValue: number | number[]) => {
    setPoint(newValue as number);
  }

  return (
    <>
      <Box sx={{
        '& > :not(style)': { m: 1, pb: 2, width: '40ch' },
      }}>
        <Typography component="h1" variant="h5">ID: {master.id}</Typography>
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, pb: 2, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} />
      </Box>
      <Box sx={{
        '& > :not(style)': { m: 1, pb: 2, width: '40ch' },
      }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleTypeChange}
          >
            {masters.map((master, index) => 
              <MenuItem value={master.type} key={index}>{master.type}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{
        '& > :not(style)': { m: 1, pb: 2, width: '40ch' },
      }}>
        <Slider
          value={point}
          onChange={handlePointChange}
          aria-label="Point"
          valueLabelDisplay="auto"
          step={5}
          min={5}
          max={50}
        />
        <Typography component="p" variant="body2">Point: {point}</Typography>
      </Box>
      <Box sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, pt: 1, pb: 1, width: 120 }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default MasterEdit;