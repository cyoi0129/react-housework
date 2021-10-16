import { VFC, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { masterSelection } from "../config";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterList, selectMaster, masterObject, editMaster, addMaster, masterData } from "../models/Master";
import { selectUser, userStatus } from "../models/User";
import { Box, TextField, InputLabel, MenuItem, FormControl, Slider, Select, SelectChangeEvent, Typography, Button } from '@mui/material';

export type Props = {
  master: masterObject;
}

const MasterEdit: VFC<Props> = (Props) => {
  const history = useHistory();
  const { master } = Props;
  const [name, setName] = useState<string>(master.name);
  const [type, setType] = useState<string>(master.type);
  const [point, setPoint] = useState<number>(master.point);
  const dispatch = useAppDispatch();
  const masterList = useAppSelector(selectMaster);
  const userStatus: userStatus = useAppSelector(selectUser);
  const userID = userStatus.userData? userStatus.userData.pk : 0;
  // const masterSelection = ['cook', 'bath', 'delivery', 'clean', '‎laundry', 'sleep', 'wash', 'child', 'others'];
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handlePointChange = (event: Event, newValue: number | number[]) => {
    setPoint(newValue as number);
  }

  const saveMaster = () => {
    const newMaster: masterData = {
      user: userID,
      type: type,
      name: name,
      point: point,
    }
    if (master.id !== 0) {
      const newValue: masterObject = {
        ...newMaster, id: master.id
      }
      dispatch(editMaster(newValue));
      history.push("/masters");
    } else {
      dispatch(addMaster(newMaster));
      history.push("/masters");
    }
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
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
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
            {masterSelection.map((master, index) => 
              <MenuItem value={master} key={index}>{master}</MenuItem>
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
          onClick={saveMaster}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default MasterEdit;