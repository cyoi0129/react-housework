import { VFC, useEffect, useState } from "react";
import { PieChart, BarChart, LineChart } from '../components'
import { Grid, Typography, Container, Paper, Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { getTaskList, selectTask, taskList, taskObject, changeTaskList, deleteTask, getWeeklyTaskList, getMonthlyTaskList } from "../models/Task";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectMaster, masterList } from "../models/Master";
import { subDays } from 'date-fns';
import { convertDate } from "../config";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWeeklyTaskList());
    dispatch(getMonthlyTaskList());
  }, []);
  const masterList: masterList = useAppSelector(selectMaster);
  const taskList: taskList = useAppSelector(selectTask);

  const getPointByMasterID = (masterID: number) => {
    const targetMaster = masterList.masters.find(master => master.id === masterID);
    return targetMaster ? targetMaster.point : 0;
  }

  const sumPoints = (tasks: taskObject[]) => {
    return tasks.reduce((sum, task) => sum + getPointByMasterID(task.master) ,0);
  }

  const PieData = () => {
    const dad_week_points: number = sumPoints(taskList.dad.week);
    const mom_week_points: number = sumPoints(taskList.mom.week);
    const dad_month_points: number = sumPoints(taskList.dad.month);
    const mom_month_points: number = sumPoints(taskList.mom.month);
    const pieData = {
      dad_week_points: dad_week_points,
      mom_week_points: mom_week_points,
      dad_month_points: dad_month_points,
      mom_month_points: mom_month_points,
    }
    return pieData;
  }

  const sumDaily = (targetDate: string, tasks: taskObject[]) => {
    const targetTaskList: taskObject[] = tasks.filter(task => task.date === targetDate);
    const totalPoints: number = sumPoints(targetTaskList);
    const totalTasks: number = targetTaskList.length;
    const total = {
      points: totalPoints,
      tasks: totalTasks
    }
    return total;
  }

  const LineData = () => {
    const today = new Date();
    let dadPointList: number[] = [];
    let momPointList: number[] = [];
    let dadTaskList: number[] = [];
    let momTaskList: number[] = [];
    [...Array(7)].map((_, i) => {
        const prev: number = 7 - i;
        const targetDate = convertDate(subDays(today, prev)).dateString;
        dadPointList.push(sumDaily(targetDate, taskList.dad.week).points);
        momPointList.push(sumDaily(targetDate, taskList.mom.week).points);
        dadTaskList.push(sumDaily(targetDate, taskList.dad.week).tasks);
        momTaskList.push(sumDaily(targetDate, taskList.mom.week).tasks);
      }
    )
    const lineData = {
      dad_points: dadPointList,
      mom_points: momPointList,
      dad_tasks: dadTaskList,
      mom_tasks: momTaskList,
    }
    return lineData;
  }

  const pieData = PieData();
  const lineData = LineData();

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
                <PieChart dad={pieData.dad_week_points} mom={pieData.mom_week_points} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper>
              <Box sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" sx={{ pb: 2 }}>Last month summary</Typography>
                <PieChart dad={pieData.dad_month_points} mom={pieData.mom_month_points} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h4" component="h2" sx={{ pt: 8, pb: 4 }}>Point Summary</Typography>
        <Typography variant="h6" component="h3"><MaleIcon />Dad's Summary</Typography>
        <Grid container spacing={2} sx={{mb:8}}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <BarChart chartData={lineData.dad_points} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <LineChart chartData={lineData.dad_tasks} />
          </Grid>
        </Grid>
        <Typography variant="h6" component="h3"><FemaleIcon />Mom's Summary</Typography>
        <Grid container spacing={2} sx={{mb:8}}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <BarChart chartData={lineData.mom_points} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <LineChart chartData={lineData.mom_tasks} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default Home;