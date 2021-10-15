import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navigatorReducer from "../models/Navigator";
import userReducer from "../models/User";
import masterReducer from "../models/Master";

export const store = configureStore({
  reducer: {
    user: userReducer,
    master: masterReducer,
    navigator: navigatorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
