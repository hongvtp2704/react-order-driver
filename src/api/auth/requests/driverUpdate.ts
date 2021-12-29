import { createAsyncThunk } from "@reduxjs/toolkit";
import { DriverUpdateUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hook/useDriverUpdate";
import { UpdateDriverRequestBody } from "../requestTypes";
import {
  DriverUpdateResponseSuccess,
  DriverUpdateResponseFailure,
} from "../responseTypes";

interface RequestInterface extends HookInterface {
  data: UpdateDriverRequestBody;
}

export const driverUpdate = createAsyncThunk<
  DriverUpdateResponseSuccess,
  RequestInterface,
  {}
>(
  "store/update",
  async (
    { driverId, data, failureCallback, successCallback }: RequestInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<DriverUpdateResponseSuccess> =
        await axios.request({
          method: "PUT",
          url: DriverUpdateUrl(driverId),
          data,
        });
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<DriverUpdateResponseFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
