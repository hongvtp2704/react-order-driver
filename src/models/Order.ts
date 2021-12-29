export type OrderModel = {
  id: string;
  store_id: string[];
  driver_id: string;
  coupon_id: string;
  user_id: string;
  total?: number;
  shipper_fee?: number;
  address: string;
  driver_rating: number;
  store_rating: number;
  status: string;
  payment_option: string;
  createdAt: string;
  updateAt: string;
  user: {
    name: string;
    address: string;
    phone: string;
  };
  driver: {
    fullname: string;
    bike_number: string;
    avatar: string;
  };
  coupon: string | null;
  orders_items: {
    order_id: string;
    food_id: string;
    qty: number;
    price?: number;
    createdAt: string;
    updateAt: string;
    food: {
      name: string;
      store: {
        id: string;
        name: string;
        address: string;
        district: string;
        phone: string;
        latitude: string;
        longitude: string;
        avatar: null;
        avatar_placeholder: string;
        open_time: string;
        close_time: string;
        status: boolean;
        total_rating: number;
        is_verified: boolean;
        createdAt: string;
        updatedAt: string;
      };
    };
  }[];
};
