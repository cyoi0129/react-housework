import { useState, useEffect, createContext } from 'react';
import { TextField, Container, Grid, List, Button, ListItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskEdit } from "../components"
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getTaskList, selectTask, taskObject } from "../models/Task";
import { selectUser, userStatus } from "../models/User";
import { dateObject, convertDate } from "../config";

export const TaskContext = createContext({} as {
  task: taskObject;
  setTask: any;
})

const Task = () => {
  const today: Date = new Date('2021-10-04');
  const [date, setDate] = useState<Date | null>(today);
  const dispatch = useAppDispatch();
  const dateObj: dateObject = convertDate(date);
  const userStatus: userStatus = useAppSelector(selectUser);
  const taskList = useAppSelector(selectTask);
  const [tasks, setTasks] = useState<taskObject[]>([]);

  const addNewTask = () => {
    const idArray: number[] = tasks.map(task => task.id);
    const currentID: number = Math.max(...idArray);
    const newID: number = currentID + 1;
    const newTask: taskObject = {
      id: newID,
      user: 1,
      master: 0,
      person: '',
      date: dateObj.dateString,
      update: true,
    }
    setTasks([...tasks, newTask]);
  }

  const removeTask = (targetID: number) => {
    setTasks(tasks.filter(task => task.id !== targetID));
  }

  const setTask = (newTask: taskObject) => {
    const tempTaskList: taskObject[] = tasks
    const targetTask = tempTaskList.find(task => task.id === newTask.id);
    if (targetTask) {
      targetTask.master = newTask.master;
      targetTask.person = newTask.person;
    }
    setTasks(tempTaskList);
  }

  const saveTasks = () => {
    console.log(tasks);
  }

  useEffect(() => {
    setTasks(taskList.tasks);
  }, [taskList, dispatch]);

  useEffect(() => {
    setTasks([]);
    // dispatch(getTaskList(dateObj.dateString));
    dispatch(getTaskList());
  }, [date]);

  return (
    <Container maxWidth="sm" sx={{ pt: 10, pb: 20 }}>
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
      <Grid container>
        <Grid item xs={12}>
          <List dense={false}>
            {tasks !== [] ? tasks.map((taskItem, index) =>
              <TaskContext.Provider key={index} value={{ task: taskItem, setTask: setTask }}>
                <ListItem>
                  <Grid container>
                    <TaskEdit />
                    <Grid item xs={1}>
                      <DeleteIcon id={String(taskItem.id)} onClick={() => removeTask(taskItem.id)} sx={{ mt: 1 }} color="primary" fontSize="large" />
                    </Grid>
                  </Grid>
                </ListItem>
              </TaskContext.Provider>) : null
            }
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ m: 1, p: 1, width: 120 }} onClick={addNewTask}>Add</Button>
      <Button variant="contained" startIcon={<SaveIcon />} sx={{ m: 1, p: 1, width: 120 }} onClick={saveTasks}>Save</Button>
    </Container>
  );
}

export default Task;