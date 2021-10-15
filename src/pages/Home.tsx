import { VFC, useEffect, useState } from "react";
import { PieChart, BarChart, LineChart } from '../components'
import { Grid, Typography, Container, Paper, Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Home = () => {
  return (
    <>
      <Box sx={{ pt:7 }}>
      <img src="/mv.jpg" alt="" width="100%" />
      </Box>
      <Container sx={{ pb: 16, pt: 4 }}>
        <Typography variant="h4" component="h2" sx={{ paddingBlock: 4 }}>Workload Report</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper>
              <Box sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" sx={{ pb: 2 }}>Last week summary</Typography>
                <PieChart />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper>
              <Box sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" sx={{ pb: 2 }}>Last month summary</Typography>
                <PieChart />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h4" component="h2" sx={{ pt: 8, pb: 4 }}>Point Summary</Typography>
        <Typography variant="h6" component="h3"><MaleIcon />Dad's Summary</Typography>
        <Grid container spacing={2} sx={{mb:8}}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <BarChart />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <LineChart />
          </Grid>
        </Grid>
        <Typography variant="h6" component="h3"><FemaleIcon />Mom's Summary</Typography>
        <Grid container spacing={2} sx={{mb:8}}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <BarChart />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <LineChart />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default Home;