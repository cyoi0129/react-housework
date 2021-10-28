// Basic Library
import { useState, useEffect, createContext, useContext } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { dateObject, convertDate, langSet } from "../config";

// Components
import { TaskEdit } from "../components"

// Models
import { getTaskList, selectTask, taskList, taskObject, changeTaskList, deleteTask } from "../models/Task";
import { userStatus } from "../models/User";
import { UserContext } from "../App";

// UI
import { TextField, Container, Grid, List, Button, ListItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export const TaskContext = createContext({} as {
  task: taskObject;
  setTask: any;
})

const Task = () => {
  const today: Date = new Date();
  const [date, setDate] = useState<Date | null>(today);
  const dispatch = useAppDispatch();
  const dateObj: dateObject = convertDate(date);
  const userStatus: userStatus = useContext(UserContext).user;
  const currentUserID: number = userStatus.userData ? userStatus.userData.pk : 0;
  const initTaskList: taskList = useAppSelector(selectTask);
  const initTaskListData: taskObject[] = initTaskList.tasks;
  const initIDArray: number[] = initTaskListData.map(task => task.id);
  const [tasks, setTasks] = useState<taskObject[]>([]);

  const addNewTask = () => {
    const idArray: number[] = tasks.map(task => task.id);
    const currentID: number = Math.max(...idArray);
    const newID: number = currentID + 1;
    const newTask: taskObject = {
      id: newID,
      user: currentUserID,
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
    let tempTaskList = tasks.filter(task => task.id !== newTask.id);
    tempTaskList.push(newTask);
    tempTaskList.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    setTasks(tempTaskList);
  }

  const saveTasks = () => {
    const currentIDArray: number[] = tasks.map(task => task.id);
    const newTasks: taskObject[] = tasks.filter(task => !initIDArray.includes(task.id));
    const removedTasks: taskObject[] = initTaskListData.filter(task => !currentIDArray.includes(task.id));
    const existTasks: taskObject[] = tasks.filter(task => initIDArray.includes(task.id));
    const changedTasks: taskObject[] = existTasks.filter(task => task.update === true);
    const changedTaskList = {
      editTaskList: changedTasks,
      newTaskList: newTasks
    }
    dispatch(changeTaskList(changedTaskList));
    if (removedTasks.length > 0) {
      removedTasks.forEach(target => {
        dispatch(deleteTask(target));
      })
    }
  }

  useEffect(() => {
    setTasks(initTaskList.tasks);
  }, [initTaskList, dispatch]);

  useEffect(() => {
    setTasks([]);
    dispatch(getTaskList(dateObj.dateString));
  }, [date]);

  return (
    <Container maxWidth="sm" sx={{ pt: 10, pb: 20 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={langSet.task.date}
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
      <Button variant="contained" startIcon={<AddIcon />} sx={{ m: 1, p: 1, width: 120 }} onClick={addNewTask}>{langSet.task.add}</Button>
      <Button variant="contained" startIcon={<SaveIcon />} sx={{ m: 1, p: 1, width: 120 }} onClick={saveTasks}>{langSet.task.save}</Button>
    </Container>
  );
}

export default Task;