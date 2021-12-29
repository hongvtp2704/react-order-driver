import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderByWeekUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useGetOrderByWeek";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

interface getOrderByWeekRequest extends HookInterface {
  driverId: string;
}

export const getOrderByWeek = createAsyncThunk<
  getOrderSuccess,
  getOrderByWeekRequest,
  {}
>(
  "order/getByStore",
  async (
    { failureCallback, successCallback, driverId }: getOrderByWeekRequest,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "GET",
        url: getOrderByWeekUrl(driverId),
      });
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<getOrderFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
