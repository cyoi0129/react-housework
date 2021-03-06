import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { apiURL } from "../config";
import Cookies from 'js-cookie';
import { masterList, masterData, masterObject, newMasterAPI, targetMasterAPI } from './types';

const initialState: masterList = {
  masters: []
}

const getCookieToken = Cookies.get('csrftoken');
const token: string = getCookieToken? getCookieToken : '';

export const getMasterList = createAsyncThunk(
  "master/getMasterList",
    async () => {
      const response = await fetch(apiURL + "api/masters/", {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        cache: 'no-cache',
      }).then((res) => res.json());
      return response;
    }
);

export const addMaster = createAsyncThunk(
  "master/addMaster",
  async (masterData: newMasterAPI) => {
    const response = await fetch(apiURL + "api/masters/", {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(masterData.content),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': masterData.token })
    }).then((res) => res.json());
    return response;
  }
);

export const editMaster = createAsyncThunk(
  "master/editMaster",
  async (masterObject: targetMasterAPI) => {
    const response = await fetch(apiURL + "api/masters/" + String(masterObject.content.id) + "/" , {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(masterObject.content),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': masterObject.token })
    }).then((res) => res.json());
    return response;
  }
);

export const removeMaster = createAsyncThunk(
  "master/removeMaster",
  async (masterObject: targetMasterAPI) => {
    const response = await fetch(apiURL + "api/masters/" + String(masterObject.content.id) + "/" , {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(masterObject.content),
      headers: new Headers({ 'Content-type': 'application/json' })
    }).then((res) => res.json());
    return response;
  }
);

const masterSlice = createSlice({
  name: "master",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMasterList.fulfilled, (state, action) => {
      state.masters = action.payload;
    });
    builder.addCase(addMaster.fulfilled, (state, action) => {
      state.masters = [...state.masters, action.payload];
    });
    builder.addCase(editMaster.fulfilled, (state, action) => {
      state.masters = state.masters.filter(master => master.id !== action.payload.id);
      state.masters = [...state.masters, action.payload];
    });
    builder.addCase(removeMaster.fulfilled, (state, action) => {
      state.masters = state.masters.filter(master => master.id !== action.payload.id);
    });
    // ???????????????????????????
    builder.addCase(getMasterList.pending, () => {
      // ?????????????????????
    });
    builder.addCase(getMasterList.rejected, () => {
      // ?????????????????????
    });
    builder.addCase(addMaster.pending, () => {
      // ?????????????????????
    });
    builder.addCase(addMaster.rejected, () => {
      // ?????????????????????
    });
    builder.addCase(editMaster.pending, () => {
      // ?????????????????????
    });
    builder.addCase(editMaster.rejected, () => {
      // ?????????????????????
    });
    builder.addCase(removeMaster.pending, () => {
      // ?????????????????????
    });
    builder.addCase(removeMaster.rejected, () => {
      // ?????????????????????
    });
  }
});

export default masterSlice.reducer;
export const selectMaster = (state: RootState) => state.master;
export const selectMasterByID = createSelector(
  (state: RootState) => state.master,
  (state: RootState, masterID: number) => masterID,
  (masters, masterID) => masters.masters.find(master => master.id === masterID),
)
export const selectMasterByName = createSelector(
  (state: RootState) => state.master,
  (state: RootState, masterName: string) => masterName,
  (masters, masterName) => masters.masters.find(master => master.name === masterName),
)