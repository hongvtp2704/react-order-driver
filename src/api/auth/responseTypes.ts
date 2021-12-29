import { DriverCreated, DriverLoginModel } from "models";

export type DriverLoginResponseSuccess = {
  data: DriverLoginModel;
};

export type DriverLoginResponseError = {
  data: {
    message: string;
    status: number;
  };
};

export type DriverUpdateResponseSuccess = {
  status: number;
  data: DriverCreated;
};

export type DriverUpdateResponseFailure = {
  data: any;
};

export type GetDriverByIdSuccess = {
  status: number;
  data: DriverCreated;
};

export type GetDriverByIdFailure = {
  data: any;
};

export type UpdatePasswordDriverSuccess = {
  status: number;
  data: DriverCreated;
};

export type UpdatePasswordFailure = {
  data: any;
};

export type UploadAvatarSuccess = {
  status: number;
  data: string;
};

export type UploadAvatarFailure = {
  data: any;
};
