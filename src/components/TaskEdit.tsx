// Basic Library
import { VFC, useEffect, useState, useContext } from "react";
import { useAppSelector } from '../app/hooks';
import { langSet } from "../config";

// Models
import { taskObject } from "../models/Task";
import { selectMaster, masterObject } from "../models/Master";
import { TaskContext } from "../pages/Task";

// UI
import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Grid } from '@mui/material';



const TaskEdit: VFC = () => {
  const { task, setTask } = useContext(TaskContext);
  const masterList = useAppSelector(selectMaster);
  const masters: masterObject[] = masterList.masters;
  // const targetMasterByID = (targetID: number) => useAppSelector((state) => selectMasterByID(state, targetID));
  // const targetMasterByName = (targetName: string) => useAppSelector((state) => selectMasterByName(state, targetName));
  
  const getMasterName = (targetID: number) => {
    const targetMaster = masters.find(master => master.id === targetID);
    const masterName: string = targetMaster ? targetMaster.name : '';
    return masterName;
  }
  
  const getMasterID = (targetName: string) => {
    const targetMaster = masters.find(master => master.name === targetName);
    const masterID: number = Number(targetMaster ? targetMaster.id : 0);
    return masterID;
  }

  const [master, setMaster] = useState<string>(getMasterName(task.master));
  const [person, setPerson] = useState<string>(task.person);

  const handleMasterChange = (event: SelectChangeEvent) => {
    const selectedMasterName: string = String(event.target.value);
    setMaster(selectedMasterName);
    const targetMasterID: number = getMasterID(selectedMasterName);
    createNewTask(targetMasterID, task.person);
  };

  const handlePersonChange = (event: SelectChangeEvent) => {
    const newPerson: string = String(event.target.value);
    setPerson(newPerson);
    createNewTask(task.master, newPerson);
  };

  const createNewTask = (master: number, person: string) => {
    const newMaster: number = master ? master : task.master;
    const newPerson: string = person ? person : task.person;
    const newTask: taskObject = {
      id: task.id,
      update: true,
      user: task.user,
      master: newMaster,
      person: newPerson,
      date: task.date
    }
    setTask(newTask);
  }

  useEffect(()=>{
    setPerson(task.person);
    setMaster(getMasterName(task.master));
  },[task])

  return (
    <>
      <Grid item xs={7}>
        <FormControl fullWidth>
          <InputLabel id="master-select-label">Master</InputLabel>
          <Select
            labelId="master-select-label"
            value={master}
            label="Master"
            onChange={handleMasterChange}
            id={String(task.id)}
          >
            {masters !== [] ? masters.map((masterItem, index) =>
              <MenuItem key={index} value={masterItem.name}>{masterItem.name}</MenuItem>
            ) : <MenuItem value='No Available Master'>No Available Master</MenuItem>}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sx={{ px: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="person-select-label">Person</InputLabel>
          <Select
            labelId="person-select-label"
            value={person}
            label="Person"
            onChange={handlePersonChange}
            id={String(task.id)}
          >
            <MenuItem value="dad">Dad</MenuItem>
            <MenuItem value="mom">Mom</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}

export default TaskEdit;