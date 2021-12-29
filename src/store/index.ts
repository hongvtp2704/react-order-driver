import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authSlice } from "./slices/auth/authSlice";
import { orderSlice } from "./slices/order/orderSlice";
import { incomeSlice } from "./slices/income/incomeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    order: orderSlice.reducer,
    income: incomeSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootReducerState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
