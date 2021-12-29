export type DriverLoginModel = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  avatar: string;
  status: boolean;
  bike_number: string;
  address: string;
  is_verified: boolean;
  is_open: boolean;
  total_rating: number;
  updatedAt: string;
  createdAt: string;
  role: string;
  accessToken: string;
};

export type DriverCreated = {
  id: string;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  bike_number: string;
  status: boolean;
  avatar: string;
  total_rating: number;
  is_verified: boolean;
  is_open: boolean;
  createdAt: string;
  updateAt: string;
};

export type DriverAvatar = {
  status?: string;
  data: string;
};
