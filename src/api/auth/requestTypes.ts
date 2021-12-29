export type DriverLoginRequestBody = {
  email: string;
  password: string;
};

export type UpdateDriverRequestBody = {
  email?: string;
  fullname?: string;
  phone?: string;
  bike_number?: string;
  address?: string;
  status?: boolean;
};

export type UpdatePasswordDriverBody = {
  oldpassword: string;
  password: string;
};
