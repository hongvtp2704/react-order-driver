import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOrderByIdUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useDeleteOrderById";
import { getOrderSuccess, getOrderFailure } from "../responseTypes";

interface deleteOrderByIdRequest extends HookInterface {
  orderId: string;
}

export const deleteOrderById = createAsyncThunk<
  getOrderSuccess,
  deleteOrderByIdRequest,
  {}
>(
  "order/delete-by-id",
  async (
    { failureCallback, successCallback, orderId }: deleteOrderByIdRequest,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getOrderSuccess> = await axios.request({
        method: "DELETE",
        url: deleteOrderByIdUrl(orderId),
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
