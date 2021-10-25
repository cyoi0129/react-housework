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

export interface existTask extends taskData {
  id: number;
}

export interface taskObject extends taskData {
  id: number;
  update: boolean;
}

export interface taskList {
  tasks: taskObject[] | [];
}

export interface changedTaskList {
  editTaskList: taskObject[] | [];
  newTaskList: taskObject[] | [];
}

const initialState: taskList = {
  tasks: []
}

const getCookieToken = Cookies.get('csrftoken');
const token: string = getCookieToken? getCookieToken : '';

export const getTaskList = createAsyncThunk(
  "task/getTaskList",
    async (date?:string) => {
      const taskURL = date? `${apiURL}api/tasks/?date=${date}`: `${apiURL}api/tasks/`;
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