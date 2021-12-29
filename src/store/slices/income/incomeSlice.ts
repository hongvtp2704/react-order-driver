import { createSlice } from "@reduxjs/toolkit";
import {
  getIncomeByWeek,
  getIncomeByMonth,
  getIncomeByYear,
} from "api/income/requests";
import {
  getIncomeOnDaySuccess,
  getIncomeOnMonthSuccess,
} from "api/income/responseTypes";
import { RootState } from "store";

interface incomeState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  listIncome: getIncomeOnDaySuccess[] | getIncomeOnMonthSuccess[] | null;
}

const initialState: incomeState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  listIncome: null,
};

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //week
    builder.addCase(getIncomeByWeek.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIncomeByWeek.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.listIncome = payload;
      return state;
    });
    builder.addCase(getIncomeByWeek.rejected, (state, action) => {
      state.isLoading = false;
      state.listIncome = null;
      state.isError = true;
    });
    //month
    builder.addCase(getIncomeByMonth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIncomeByMonth.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.listIncome = payload;
      return state;
    });
    builder.addCase(getIncomeByMonth.rejected, (state, action) => {
      state.isLoading = false;
      state.listIncome = null;
      state.isError = true;
    });
    //year
    builder.addCase(getIncomeByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIncomeByYear.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.listIncome = payload;
      return state;
    });
    builder.addCase(getIncomeByYear.rejected, (state, action) => {
      state.isLoading = false;
      state.listIncome = null;
      state.isError = true;
    });
  },
});

export const incomeSelector = (state: RootState) => state.income;
export default incomeSlice.reducer;
