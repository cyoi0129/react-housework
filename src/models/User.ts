import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { apiURL } from "../config";
import Cookies from 'js-cookie';

export interface userData {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface loginData {
  username: string;
  password: string;
}

export interface registerData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface userStatus {
  isLogined: boolean;
  token: string;
  userData: userData | null;
}

const initialState: userStatus = {
  isLogined: false,
  token: '',
  userData: null,
};

const getCookieToken = Cookies.get('csrftoken');
const token: string = getCookieToken? getCookieToken : '';

export const userLogin = createAsyncThunk(
  "user/userLogin",
    async (loginData: loginData) => {
      const response = await fetch(apiURL + "rest-auth/login/", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
        headers: new Headers({ 'Content-type': 'application/json' })
      }).then((res) => res.json());
      return response;
    }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
    async () => {
      const response = await fetch(apiURL + "rest-auth/logout/", {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': token })
      }).then((res) => res.json());
      return response;
    }
);

export const userRegister = createAsyncThunk(
  "user/userRegister",
    async (registerData: registerData) => {
      const response = await fetch(apiURL + "rest-auth/registration/", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password1: registerData.password1,
          password2: registerData.password2,
        }),
        headers: new Headers({ 'Content-type': 'application/json' })
      }).then((res) => res.json());
      return response;
    }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async () => {
    const response = await fetch(apiURL + "rest-auth/user/", {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
    }).then((res) => res.json());
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoginStatus: (state) => {
      state.isLogined = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLogined = true;
      Cookies.set('isLogined', '1', { expires: 1 });
      state.token = action.payload.key;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLogined = false;
      state.userData = null;
      Cookies.remove('isLogined');
      Cookies.remove('csrftoken');
      Cookies.remove('sessionid');
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLogined = true;
      Cookies.set('isLogined', '1', { expires: 1 });
      state.token = action.payload.key;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    // エラー処理ブロック
    builder.addCase(userLogin.pending, () => {
      // エラー画面表示
    });
    builder.addCase(userLogin.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(userLogout.pending, () => {
      // エラー画面表示
    });
    builder.addCase(userLogout.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(userRegister.pending, () => {
      // エラー画面表示
    });
    builder.addCase(userRegister.rejected, () => {
      // エラー画面表示
    });
    builder.addCase(getUserData.pending, () => {
      // エラー画面表示
    });
    builder.addCase(getUserData.rejected, () => {
      // エラー画面表示
    });
  }
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
export const { setLoginStatus } = userSlice.actions;