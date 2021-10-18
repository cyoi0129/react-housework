import { VFC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Box, TextField, InputLabel, MenuItem, FormControl, Slider, Select, SelectChangeEvent, Typography, Button, Container, Grid, ListItem, ListItemText } from '@mui/material';
import { taskObject } from "../models/Task";
import { selectMaster, masterObject, editMaster, addMaster, masterData } from "../models/Master";
import { dateObject, convertDate } from "../config";

export type Props = {
  task: taskObject;
  date: Date | null;
}

const TaskEdit: VFC<Props> = (Props) => {
  const { task, date } = Props;
  const dateObj: dateObject = convertDate(date);
  console.log(dateObj);
  const masterList = useAppSelector(selectMaster);
  const masters: masterObject[] = masterList.masters;
  const targetMaster = masters.find(master => master.id === task.master);
  const masterName: string = targetMaster? targetMaster.name : '';
  const [master, setMaster] = useState<string>(masterName);
  const [person, setPerson] = useState<string>(task.person);
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
            <ListItemText sx={{pt:1}} primary={task.id ? task.id: 'new'} />
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
                {['a','b','c'].map((master, index) => {
                  <MenuItem key={index} value={master}>{master}</MenuItem>
                })}

              {masters !== [] ? masters.map((masterItem, index) =>
                <MenuItem key={index} value={masterItem.name}>{masterItem.name}</MenuItem>
              ) : <MenuItem value='No Available Master'>No Available Master</MenuItem>}
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
                <MenuItem value="dad">Dad</MenuItem>
                <MenuItem value="mom">Mom</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
    </ListItem>
  );
}

export default TaskEdit;