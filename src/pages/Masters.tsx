// Basic Library
import { VFC } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { langSet, webPath } from "../config";

// Components
import { MasterView } from "../components";

// Models
import { selectMaster } from "../models";
import { masterObject } from "../models/types";

// UI
import { Container, Grid, List, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Masters: VFC = () => {
  const history = useHistory();
  const masterList = useAppSelector(selectMaster);
  const masters: masterObject[] = masterList.masters;
  const addMaster = () => {
    history.push(webPath + 'master/new');
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
          {langSet.master.add}
        </Button>
        </Grid>
      </Grid>
  </Container>
  )
}
export default Masters;