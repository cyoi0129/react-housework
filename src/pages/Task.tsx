import { useState } from 'react';
import { TextField, Container, Grid, List, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { TaskEdit } from "../components"

const Task = () => {
  const [value, setValue] = useState<Date | null>(null);
  const alertValue = (convertValue: any) => {
    if (convertValue !== null) {
      const y = convertValue.getFullYear();
      const m = ("00" + (convertValue.getMonth()+1)).slice(-2);
      const d = ("00" + convertValue.getDate()).slice(-2);
      const dateString = y + "-" + m + "-" + d;
      const dateNumbner = Number(y + m + d);
      // const dateNumbner = convertValue.getTime();
      console.log(dateString, dateNumbner);
    }
  }
  return (
    <Container maxWidth="sm" sx={{pt: 10, pb: 20}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            alertValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense={false}>
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
            <TaskEdit />
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ m:1, p: 1, width: 120 }}>Add</Button>
      <Button variant="contained" startIcon={<SaveIcon />} sx={{ m:1, p: 1, width: 120 }}>Save</Button>
    </Container>
  );
}

export default Task;