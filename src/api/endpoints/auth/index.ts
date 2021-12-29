export const DriverLoginUrl = "/api/driver/login";
export const DriverUpdateUrl = (id: string): string => `/api/driver/${id}`;
export const GetDriverByIdUrl = (id: string): string =>
  `/api/driver/show/${id}`;

export const UpdatePasswordDriverUrl = (id: string): string =>
  `/api/driver/update-password/${id}`;

export const UploadAvatarDriverUrl = (id: string): string =>
  `/api/driver/uploadImage/${id}`;
