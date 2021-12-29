import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderByPresentUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useGetOrderByPresent";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

interface getOrderByPresentRequest extends HookInterface {
  driverId: string;
}

export const getOrderByPresent = createAsyncThunk<
  getOrderSuccess,
  getOrderByPresentRequest,
  {}
>(
  "order/getByStore",
  async (
    { failureCallback, successCallback, driverId }: getOrderByPresentRequest,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "GET",
        url: getOrderByPresentUrl(driverId),
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
