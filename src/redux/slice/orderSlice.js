import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistoryData: [],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDER(state, action) {
      // console.log(action.payload);
      state.orderHistoryData = action.payload;
    },
    CALC_TOTAL_ORDER_AMOUNT(state, action) {
      const array = [];
      state.orderHistoryData.map((item) => {
        const { orderAmount } = item;
        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((a, b) => a + b, 0);
      state.totalOrderAmount = totalAmount;
    },
  },
});

export const { STORE_ORDER, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions;

export const selectOrderHistoryData = (state) => state.orders.orderHistoryData;

export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer;
