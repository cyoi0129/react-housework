import { VFC, useEffect, useState } from "react";
import { TextField, Container, Grid, List, Button } from '@mui/material';
import { MasterView } from "../components";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMasterList, selectMaster, masterObject } from "../models/Master";

const Masters: VFC = () => {
  const dispatch = useAppDispatch();
  const masterList = useAppSelector(selectMaster);
  const masters:masterObject[] = masterList.masters;
  return (
  <Container maxWidth="sm" sx={{ mt: 10 }}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense>
          {masters !== [] ? masters.map((masterItem, index) =>
                <MasterView key={index} master={masterItem} />) : null
          }
          </List>
        </Grid>
      </Grid>
  </Container>
  )
}
export default Masters;