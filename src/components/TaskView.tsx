import { Grid, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const TaskView = () => {
  return (
    <>
      <ListItem sx={{pt:2, pb:2}}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ListItemText primary="Wash dishes" secondary="2021/10/11" />
          </Grid>
          <Grid item xs={1}>
            <ListItemIcon sx={{pt:2}}>
              <MaleIcon />
            </ListItemIcon>
          </Grid>
          <Grid item xs={3}>
            <ListItemText primary="Dad" sx={{pt:2}} />
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
}

export default TaskView;
