import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIncomeByWeekUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "api/income/hooks/useGetIncomeByWeek";
import { getIncomeOnDaySuccess, getIncomeFailure } from "../responseTypes";

export const getIncomeByWeek = createAsyncThunk<
  getIncomeOnDaySuccess[],
  HookInterface,
  {}
>(
  "income/getByWeek",
  async (
    { failureCallback, successCallback, driverId }: HookInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getIncomeOnDaySuccess[]> =
        await axios.request({
          method: "GET",
          url: getIncomeByWeekUrl(driverId),
        });
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<getIncomeFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
