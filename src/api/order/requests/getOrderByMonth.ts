import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderByMonthUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useGetOrderByMonth";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

interface getOrderByMonthRequest extends HookInterface {
  driverId: string;
}

export const getOrderByMonth = createAsyncThunk<
  getOrderSuccess,
  getOrderByMonthRequest,
  {}
>(
  "order/getByStore",
  async (
    { failureCallback, successCallback, driverId }: getOrderByMonthRequest,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "GET",
        url: getOrderByMonthUrl(driverId),
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
