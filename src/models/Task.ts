import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { apiURL, convertDate } from "../config";
import { subMonths, subWeeks, subDays } from 'date-fns';
import { taskList, taskData, existTask, taskObject, targetTaskAPI, taskListAPI } from './types';

const initialState: taskList = {
  tasks: [],
  dad: {
    week: [],
    month: []
  },
  mom: {
    week: [],
    month: []
  }
}

const setDateRange = () => {
  const today = new Date();
  const endDate = convertDate(subDays(today, 1)).dateString;
  const startWeek = convertDate(subWeeks(today, 1)).dateString;
  const startMonth = convertDate(subMonths(today, 1)).dateString;
  const dateRange = {
    startWeek: startWeek,
    startMonth: startMonth,
    endDate: endDate
  }
  return dateRange;
}

export const getTaskList = createAsyncThunk(
  "task/getTaskList",
    async (date: string) => {
      const taskURL = `${apiURL}api/tasks/?start_date=${date}&end_date=${date}`;
      const response = await fetch(taskURL, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        cache: 'no-cache',
      }).then((res) => res.json());
      response.forEach((element: any) => {
        element['update'] = false;
      });
      return response;
    }
);

export const getWeeklyTaskList = createAsyncThunk(
  "task/getWeeklyTaskList",
    async () => {
      const taskURL = `${apiURL}api/tasks/?start_date=${setDateRange().startWeek}&end_date=${setDateRange().endDate}`;
      const response = await fetch(taskURL, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        cache: 'no-cache',
      }).then((res) => res.json());
      return response;
    }
);

export const getMonthlyTaskList = createAsyncThunk(
  "task/getMonthlyTaskList",
    async () => {
      const taskURL = `${apiURL}api/tasks/?start_date=${setDateRange().startMonth}&end_date=${setDateRange().endDate}`;
      const response = await fetch(taskURL, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        cache: 'no-cache',
      }).then((res) => res.json());
      return response;
    }
);

export const changeTaskList = createAsyncThunk(
  "task/changeTaskList",
  async (taskData: taskListAPI) => {
    let postData: (taskData | existTask)[] = [];
    taskData.editTaskList.forEach( item => {
      postData.push(
        {
          id: item.id,
          user: item.user,
          master: item.master,
          person: item.person,
          date: item.date
        }
      )
    })
    taskData.newTaskList.forEach( item => {
      postData.push(
        {
          user: item.user,
          master: item.master,
          person: item.person,
          date: item.date
        }
      )
    })
    const response = await fetch(apiURL + "api/tasks/", {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(postData),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': taskData.token })
    }).then((res) => res.json());
    const result = {
      content: response,
      date: taskData.date
    }
    return result;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (targetTask: targetTaskAPI) => {
    const targetTaskURL = `${apiURL}api/tasks/${String(targetTask.content.id)}/?start_date=${targetTask.date}&end_date=${targetTask.date}`;
    const response = await fetch(targetTaskURL, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(targetTask.content),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': targetTask.token })
    })
    .then((res) => res.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return targetTask.content.id;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getWeeklyTaskList.fulfilled, (state, action) => {
      const tasks: taskObject[] = action.payload;
      state.dad.week = tasks.filter(task => task.person === 'dad');
      state.mom.week = tasks.filter(task => task.person === 'mom');
    });
    builder.addCase(getMonthlyTaskList.fulfilled, (state, action) => {
      const tasks: taskObject[] = action.payload;
      state.dad.month = tasks.filter(task => task.person === 'dad');
      state.mom.month = tasks.filter(task => task.person === 'mom');
    });
    builder.addCase(changeTaskList.fulfilled, (state, action) => {
      const tasks: taskObject[] = action.payload.content;
      state.tasks = tasks.filter(task => task.date === action.payload.date);
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      console.log('call sucess')
      const targetID: number = Number(action.payload);
      state.tasks = state.tasks.filter(task => task.id !== targetID);
    });
    // エラー処理ブロック
    builder.addCase(getTaskList.pending, () => {
      // エラー画面表示
    });
    builder.addCase(getTaskList.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(getWeeklyTaskList.pending, () => {
      // エラー画面表示
    });
    builder.addCase(getWeeklyTaskList.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(getMonthlyTaskList.pending, () => {
      // エラー画面表示
    });
    builder.addCase(getMonthlyTaskList.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(changeTaskList.pending, () => {
      // エラー画面表示
    });
    builder.addCase(changeTaskList.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(deleteTask.pending, () => {
      // エラー画面表示
    });
    builder.addCase(deleteTask.rejected, () => {
      // エラー画面表示
    });
  }
});

export default taskSlice.reducer;
export const selectTask = (state: RootState) => state.task;