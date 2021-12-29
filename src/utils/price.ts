import currency from "currency.js";

export const getVndPrice = (price: string | number): string => {
  return currency(price, { symbol: "đ", precision: 0 }).format();
};
