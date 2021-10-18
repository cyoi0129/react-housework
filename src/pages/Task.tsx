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

const Task = () => {
  const today: Date = new Date();
  const [date, setDate] = useState<Date | null>(today);
  const userStatus: userStatus = useAppSelector(selectUser);
  const isLogined = userStatus.isLogined;
  const dispatch = useAppDispatch();
  const alertDate = (convertDate: any) => {
    if (convertDate !== null) {
      const y = convertDate.getFullYear();
      const m = ("00" + (convertDate.getMonth()+1)).slice(-2);
      const d = ("00" + convertDate.getDate()).slice(-2);
      const dateString = y + "-" + m + "-" + d;
      const dateNumbner = Number(y + m + d);
    }
  }
  const taskList = useAppSelector(selectTask);
  const tasks: taskObject[] = taskList.tasks;

  useEffect(() => {
    if (isLogined) {
      dispatch(getTaskList());
    }
  }, [isLogined, dispatch]);

  return (
    <Container maxWidth="sm" sx={{pt: 10, pb: 20}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            alertDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense={false}>
          {tasks !== [] ? tasks.map((taskItem, index) =>
                <TaskEdit key={index} task={taskItem} date={date} />) : null
          }
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ m:1, p: 1, width: 120 }}>Add</Button>
      <Button variant="contained" startIcon={<SaveIcon />} sx={{ m:1, p: 1, width: 120 }}>Save</Button>
    </Container>
  );
}

export default Task;