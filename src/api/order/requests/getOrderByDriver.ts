import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderByDriverUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useGetOrderByDriver";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

interface getOrderByDriverRequest extends HookInterface {
  driverId: string;
}

export const getOrderByDriver = createAsyncThunk<
  getOrderSuccess,
  getOrderByDriverRequest,
  {}
>(
  "order/getByStore",
  async (
    { failureCallback, successCallback, driverId }: getOrderByDriverRequest,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "GET",
        url: getOrderByDriverUrl(driverId),
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
