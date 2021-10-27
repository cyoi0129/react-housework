// Basic Library
import { VFC } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { langSet } from "../config";

// Components
import { MasterView } from "../components";

// Models
import { selectMaster, masterObject } from "../models/Master";

// UI
import { Container, Grid, List, Button, ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Masters: VFC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const masterList = useAppSelector(selectMaster);
  const masters: masterObject[] = masterList.masters;
  const addMaster = () => {
    history.push('/master/new');
  }
  return (
  <Container maxWidth="sm" sx={{ pt: 10, pb: 20 }}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense>
          {masters !== [] ? masters.map((masterItem, index) =>
                <MasterView key={index} master={masterItem} />) : null
          }
          </List>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, pt: 1, pb: 1, width: 200 }}
            onClick={addMaster}
            startIcon={<AddIcon />}
          >
          Add a new master
        </Button>
        </Grid>
      </Grid>
  </Container>
  )
}
export default Masters;