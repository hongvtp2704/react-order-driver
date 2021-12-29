import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdatePasswordDriverUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hook/useUpdatePasswordDriver";
import { UpdatePasswordDriverBody } from "../requestTypes";
import {
  UpdatePasswordDriverSuccess,
  UpdatePasswordFailure,
} from "../responseTypes";

interface RequestInterface extends HookInterface {
  data: UpdatePasswordDriverBody;
}

export const updatePasswordDriver = createAsyncThunk<
  UpdatePasswordDriverSuccess,
  RequestInterface,
  {}
>(
  "store/update-password",
  async (
    { driverId, data, failureCallback, successCallback }: RequestInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<UpdatePasswordDriverSuccess> =
        await axios.request({
          method: "PUT",
          url: UpdatePasswordDriverUrl(driverId),
          data,
        });
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<UpdatePasswordFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
