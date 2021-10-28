// Basic Library
import { VFC, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { langSet } from "../config";
import { useAppDispatch } from '../app/hooks';

// Components
import { Overlay, Notification } from "../components"

// Models
import { editMaster, addMaster } from "../models";
import { masterObject, masterData, userStatus } from "../models/types";
import { UserContext } from "../App";

// UI
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
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userStatus: userStatus = useContext(UserContext).user;
  const userID = userStatus.userData? userStatus.userData.pk : 0;

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
    if (master.id) {
      const newValue: masterObject = {
        ...newMaster, id: master.id
      }
      dispatch(editMaster(newValue));
    } else {
      dispatch(addMaster(newMaster));
    }
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      history.push("/masters");
    }, 2000);
  }

   return (
    <>
      <Box sx={{
        '& > :not(style)': { m: 1, pb: 2, maxWidth: '40ch' },
      }}>
        <Typography component="h1" variant="h5">ID: {master.id}</Typography>
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, pb: 2, maxWidth: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label={langSet.master.name} variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
      </Box>
      <Box sx={{
        '& > :not(style)': { m: 1, pb: 2, maxWidth: '40ch' },
      }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{langSet.master.type}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleTypeChange}
          >
            {
              Object.entries(langSet.common.category).map(([key, value]) => <MenuItem value={key} key={key}>{value}</MenuItem>)
            }
          </Select>
        </FormControl>
      </Box>
      <Box sx={{
        '& > :not(style)': { m: 1, pb: 2, maxWidth: '40ch' },
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
        <Typography component="p" variant="body2">{langSet.master.point + ': ' + point}</Typography>
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
          {langSet.master.save}
        </Button>
      </Box>
      <Overlay isDisplay={loading} />
      <Notification isDisplay={snackBar} />
    </>
  );
}

export default MasterEdit;