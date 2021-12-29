import { createSlice } from "@reduxjs/toolkit";
import {
  getOrderByDriver,
  getOrderByFindingDriver,
  getCurrentOrder,
  updateStatus,
} from "api/order";
import { getOrderSuccess } from "api/order/responseTypes";
import { RootState } from "store";

interface orderState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  listOrder: getOrderSuccess | null;
}

const initialState: orderState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  listOrder: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderByDriver.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByDriver.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.listOrder = payload;
      return state;
    });
    builder.addCase(getOrderByDriver.rejected, (state, action) => {
      state.isLoading = false;
      state.listOrder = null;
      state.isError = true;
    });
    //finding driver
    builder.addCase(getOrderByFindingDriver.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByFindingDriver.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.listOrder = payload;
      return state;
    });
    builder.addCase(getOrderByFindingDriver.rejected, (state, action) => {
      state.isLoading = false;
      state.listOrder = null;
      state.isError = true;
    });
    //current order
    builder.addCase(getCurrentOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentOrder.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.listOrder = payload;
      return state;
    });
    builder.addCase(getCurrentOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.listOrder = null;
      state.isError = true;
    });
  },
});

export const orderSelector = (state: RootState) => state.order;
export default orderSlice.reducer;
