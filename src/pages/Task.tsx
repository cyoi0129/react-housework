import { useState, useEffect } from 'react';
import { TextField, Container, Grid, List, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { TaskEdit } from "../components"
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getTaskList, selectTask, taskObject } from "../models/Task";
import { selectUser, userStatus } from "../models/User";
import { dateObject, convertDate } from "../config";

const Task = () => {
  const today: Date = new Date('2021-10-04');
  const [date, setDate] = useState<Date | null>(today);
  const dispatch = useAppDispatch();
  const dateObj: dateObject = convertDate(date);
  const userStatus: userStatus = useAppSelector(selectUser);
  const isLogined = userStatus.isLogined;
  const taskList = useAppSelector(selectTask).tasks;
  const [tasks, setTasks] = useState<taskObject[]>([]);
  const addNewTask = () => {
    const newTask: taskObject = {
      id: null,
      user: 1,
      master: 0,
      person: '',
      date: '',
      update: true,
    }
    console.log(newTask, tasks);
    setTasks([...tasks, newTask]);
  }

  useEffect(() => {
    if (isLogined) {
      dispatch(getTaskList(dateObj.dateString));
    }
  }, [isLogined, dispatch]);

  useEffect(() => {
      setTasks(taskList);
  }, [taskList]);

  return (
    <Container maxWidth="sm" sx={{pt: 10, pb: 20}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense={false}>
          {tasks !== [] ? tasks.map((taskItem, index) =>
                <TaskEdit key={index} task={taskItem} />) : null
          }
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ m:1, p: 1, width: 120 }} onClick={addNewTask}>Add</Button>
      <Button variant="contained" startIcon={<SaveIcon />} sx={{ m:1, p: 1, width: 120 }}>Save</Button>
    </Container>
  );
}

export default Task;