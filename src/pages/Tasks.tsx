import { useState } from 'react';
import { TextField, Container, Grid, List, Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TaskView } from "../components"

const Tasks = () => {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);

  return (
  <Container maxWidth="sm" sx={{ mt: 10 }}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="From"
        endText="To"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense>
            <TaskView />
            <TaskView />
            <TaskView />
            <TaskView />
          </List>
        </Grid>
      </Grid>
  </Container>
  )
}
export default Tasks;