import { useState } from 'react';
import { Box, TextField, InputLabel, MenuItem, FormControl, Slider, Select, SelectChangeEvent, Typography, Button, Container, Grid, ListItem, ListItemText } from '@mui/material';

const TaskEdit = () => {
  const [master, setMaster] = useState<string>('');
  const [person, setPerson] = useState<string>('');
  const handleMasterChange = (event: SelectChangeEvent) => {
    setMaster(event.target.value as string);
  };
  const handlePersonChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string);
  };

  return (
    <ListItem>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ListItemText sx={{pt:1}} primary="123" />
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="master-select-label">Master</InputLabel>
              <Select
                labelId="master-select-label"
                value={master}
                label="Master"
                onChange={handleMasterChange}
              >
                <MenuItem value="Master1">Master1</MenuItem>
                <MenuItem value="Master2">Master2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="person-select-label">Person</InputLabel>
              <Select
                labelId="person-select-label"
                value={person}
                label="Person"
                onChange={handlePersonChange}
              >
                <MenuItem value="Dad">Dad</MenuItem>
                <MenuItem value="Mom">Mom</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
    </ListItem>
  );
}

export default TaskEdit;