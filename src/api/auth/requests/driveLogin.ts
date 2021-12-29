import { createAsyncThunk } from "@reduxjs/toolkit";
import { DriverLoginUrl } from "api/endpoints/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import { axiosSetAuthToken } from "utils";
import { HookInterface } from "../hook/useDriverLogin";
import { DriverLoginRequestBody } from "../requestTypes";
import {
  DriverLoginResponseSuccess,
  DriverLoginResponseError,
} from "../responseTypes";

interface RequestInterface extends HookInterface {
  data: DriverLoginRequestBody;
}

export const driverLogin = createAsyncThunk<
  DriverLoginResponseSuccess,
  RequestInterface,
  {}
>(
  "store/register",
  async (
    { data, failureCallback, successCallback }: RequestInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<DriverLoginResponseSuccess> =
        await axios.request({
          method: "POST",
          url: DriverLoginUrl,
          data,
        });
      axiosSetAuthToken(response.data.data.accessToken);
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<DriverLoginResponseError>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
