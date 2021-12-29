import axios, { AxiosError, AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HookInterface } from "../hook/useUploadAvatarDriver";
import { UploadAvatarDriverUrl } from "api/endpoints";
import { UploadAvatarSuccess, UploadAvatarFailure } from "../responseTypes";

export interface RequestInterface extends HookInterface {
  avatar: Blob;
  driverId: string;
}

export const requestUploadAvatarDriver = createAsyncThunk(
  "driver/uploadAvatar",
  async (
    { avatar, driverId, failureCallback, successCallback }: RequestInterface,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = new FormData();
      data.append("avatar", avatar);
      const response: AxiosResponse<UploadAvatarSuccess> = await axios.request({
        method: "POST",
        url: UploadAvatarDriverUrl(driverId),
        data,
      });
      successCallback && successCallback(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<UploadAvatarFailure>;
      if (!error.response) {
        throw err;
      } else {
        failureCallback && failureCallback(error);
        return rejectWithValue(error.response.data);
      }
    }
  }
);
