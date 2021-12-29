import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderFindingDriver } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useGetOrderByDriver";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

export const getOrderByFindingDriver = createAsyncThunk<
  getOrderSuccess,
  HookInterface,
  {}
>(
  "order/getByFindingDriver",
  async (
    { failureCallback, successCallback }: HookInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "GET",
        url: getOrderFindingDriver(),
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
