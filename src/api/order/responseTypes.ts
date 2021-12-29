import { OrderModel } from "models";

export type getOrderSuccess = {
  size: number;
  currentPage: number;
  total: number;
  data: OrderModel[];
};

export type getOrderFailure = {
  data: any;
};

export type updateStatusSuccess = {
  status: number;
  data: {
    id: string;
    store_id: string[];
    driver_id: string;
    coupon_id: string | null;
    user_id: string;
    total: number;
    shipper_fee: number;
    driver_rating: number;
    store_rating: number;
    status: string;
    payment_option: string;
    createdAt: string;
    updateAt: string;
  };
};

export type updateStatusFailure = {
  data: any;
};
