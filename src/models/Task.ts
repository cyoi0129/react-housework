import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { apiURL } from "../config";
import Cookies from 'js-cookie';

export interface taskData {
  user: number;
  master: number;
  person: string;
  date: string;
}

export interface taskObject extends taskData {
  id: number | null;
}

export interface taskList {
  tasks: taskObject[] | [];
}

const initialState: taskList = {
  tasks: []
}

const getCookieToken = Cookies.get('csrftoken');
const token: string = getCookieToken? getCookieToken : '';

export const getTaskList = createAsyncThunk(
  "task/getTaskList",
    async () => {
      const response = await fetch(apiURL + "api/tasks/", {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        cache: 'no-cache',
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

export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (taskObject: taskObject) => {
    const response = await fetch(apiURL + "api/tasks/" + String(taskObject.id) + "/" , {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(taskObject),
      headers: new Headers({ 'Content-type': 'application/json' })
    }).then((res) => res.json());
    return response;
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
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    });
    // エラー処理ブロック
    builder.addCase(getTaskList.pending, () => {
      // エラー画面表示
    });
    builder.addCase(getTaskList.rejected, () => {
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
    builder.addCase(removeTask.pending, () => {
      // エラー画面表示
    });
    builder.addCase(removeTask.rejected, () => {
      // エラー画面表示
    });
  }
});

export default taskSlice.reducer;
export const selectTask = (state: RootState) => state.task;