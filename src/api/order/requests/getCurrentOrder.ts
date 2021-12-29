import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentOrderUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useGetCurrentOrder";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

interface getCurrentOrderRequest extends HookInterface {
  driverId: string;
}

export const getCurrentOrder = createAsyncThunk<
  getOrderSuccess,
  getCurrentOrderRequest,
  {}
>(
  "order/getCurrentOrder",
  async (
    { failureCallback, successCallback, driverId }: getCurrentOrderRequest,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "GET",
        url: getCurrentOrderUrl(driverId),
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
