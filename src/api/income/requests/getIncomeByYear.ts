import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIncomeByYearUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "api/income/hooks/useGetIncomeByYear";
import { getIncomeOnMonthSuccess, getIncomeFailure } from "../responseTypes";

export const getIncomeByYear = createAsyncThunk<
  getIncomeOnMonthSuccess[],
  HookInterface,
  {}
>(
  "income/getByYear",
  async (
    { failureCallback, successCallback, driverId }: HookInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getIncomeOnMonthSuccess[]> =
        await axios.request({
          method: "GET",
          url: getIncomeByYearUrl(driverId),
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
