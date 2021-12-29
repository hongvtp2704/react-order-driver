import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetDriverByIdUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HookInterface } from "../hook/useGetDriverById";
import { GetDriverByIdSuccess, GetDriverByIdFailure } from "../responseTypes";

export const getDriverById = createAsyncThunk<
  GetDriverByIdSuccess,
  HookInterface,
  {}
>(
  "store/get-store-by-id",
  async (
    { driverId, failureCallback, successCallback }: HookInterface,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<GetDriverByIdSuccess> = await axios.request(
        {
          method: "GET",
          url: GetDriverByIdUrl(driverId),
        }
      );
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<GetDriverByIdFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
