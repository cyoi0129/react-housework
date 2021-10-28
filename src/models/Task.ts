import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { apiURL, convertDate } from "../config";
import Cookies from 'js-cookie';
import { subMonths, subWeeks, subDays } from 'date-fns';

export interface taskData {
  user: number;
  master: number;
  person: string;
  date: string;
}

export interface existTask extends taskData {
  id: number;
}

export interface taskObject extends taskData {
  id: number;
  update: boolean;
}

export interface personTaskList {
  week: taskObject[] | [];
  month: taskObject[] | [];
}

export interface taskList {
  tasks: taskObject[] | [];
  dad: personTaskList;
  mom: personTaskList;
}

export interface changedTaskList {
  editTaskList: taskObject[] | [];
  newTaskList: taskObject[] | [];
}

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

const getCookieToken = Cookies.get('csrftoken');
const token: string = getCookieToken? getCookieToken : '';
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
  async (taskData: changedTaskList) => {
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
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': token })
    }).then((res) => res.json());
    return response;
  }
);

export const addTask = createAsyncThunk(
  "task/addTask",
  async (taskData: taskData) => {
    const response = await fetch(apiURL + "api/tasks/", {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(taskData),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': token })
    }).then((res) => res.json());
    return response;
  }
);

export const editTask = createAsyncThunk(
  "task/editTask",
  async (taskObject: taskObject) => {
    const response = await fetch(apiURL + "api/tasks/" + String(taskObject.id) + "/" , {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(taskObject),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': token })
    }).then((res) => res.json());
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskObject: taskObject) => {
    const response = await fetch(apiURL + "api/tasks/" + String(taskObject.id) + "/" , {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(taskObject),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': token })
    })
    .then((res) => res.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return taskObject.id;
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
      state.tasks = action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
      state.tasks = [...state.tasks, action.payload];
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
    builder.addCase(addTask.pending, () => {
      // エラー画面表示
    });
    builder.addCase(addTask.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(editTask.pending, () => {
      // エラー画面表示
    });
    builder.addCase(editTask.rejected, () => {
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