import { createSlice } from "@reduxjs/toolkit";
import {
  driverLogin,
  driverUpdate,
  getDriverById,
  updatePasswordDriver,
  requestUploadAvatarDriver,
} from "api/auth/requests";
import { DriverAvatar, DriverCreated, DriverLoginModel } from "models";
import { RootState } from "store";

interface AuthState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: DriverLoginModel | null;
  token: string | null;
  driverDetail: DriverCreated | null;
  avatar: DriverAvatar | null;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
  token: sessionStorage.getItem("accessToken") || "",
  driverDetail: null,
  avatar: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetToken: (state) => {
      state.token = "";
      sessionStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(driverLogin.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.data;
      state.avatar = { status: "200", data: action.payload.data.avatar };
      state.token = action.payload.data.accessToken;
      sessionStorage.setItem("accessToken", action.payload.data.accessToken);
      sessionStorage.setItem("driver_id", action.payload.data.id);
      return state;
    });
    builder.addCase(driverLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(driverLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.isError = true;
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("driver_id");
    });
    builder.addCase(driverUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(driverUpdate.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.driverDetail = action.payload.data;
      state.avatar = { status: "200", data: action.payload.data.avatar };
      return state;
    });
    builder.addCase(driverUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.driverDetail = null;
    });
    builder.addCase(updatePasswordDriver.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePasswordDriver.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.driverDetail = action.payload.data;
      return state;
    });
    builder.addCase(updatePasswordDriver.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.driverDetail = null;
    });
    //upload avatar
    builder.addCase(requestUploadAvatarDriver.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestUploadAvatarDriver.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.avatar = action?.payload as DriverAvatar;
      return state;
    });
    builder.addCase(requestUploadAvatarDriver.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { resetToken } = authSlice.actions;
export default authSlice.reducer;
