import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateStatusToCookingFoodUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hooks/useUpdateStatusCookingFood";
import { updateStatusRequestBody } from "../requestTypes";
import { updateStatusSuccess, updateStatusFailure } from "../responseTypes";

interface RequestInterface extends HookInterface {
  orderId: string;
  driver_id: string;
  status: string;
}

export const updateStatusCookingFood = createAsyncThunk<
  updateStatusSuccess,
  RequestInterface,
  {}
>(
  "order/update-status-to-cooking-food",
  async (
    {
      orderId,
      driver_id,
      status,
      failureCallback,
      successCallback,
    }: RequestInterface,
    { rejectWithValue }
  ) => {
    try {
      const data = {
        driver_id: driver_id,
        status: status,
      };
      const response: AxiosResponse<updateStatusSuccess> = await axios.request({
        method: "PUT",
        url: updateStatusToCookingFoodUrl(orderId),
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
