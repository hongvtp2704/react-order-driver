import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateStatusUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useUpdateStatusCookingFood";
import { updateStatusRequestBody } from "../requestTypes";
import { updateStatusSuccess, updateStatusFailure } from "../responseTypes";

interface RequestInterface extends HookInterface {
  orderId: string;
  status: string;
}

export const updateStatus = createAsyncThunk<
  updateStatusSuccess,
  RequestInterface,
  {}
>(
  "order/update-status",
  async (
    { orderId, status, failureCallback, successCallback }: RequestInterface,
    { rejectWithValue }
  ) => {
    try {
      const data = {
        status: status,
      };
      const response: AxiosResponse<updateStatusSuccess> = await axios.request({
        method: "PUT",
        url: updateStatusUrl(orderId),
        data,
      });
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<updateStatusFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
