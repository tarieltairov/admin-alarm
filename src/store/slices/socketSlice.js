import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  orderList: [],
  orderCount: null,
  onlineGuards: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
    setOrderList(state, action) {
      state.orderList = action.payload;
    },
    setOrderCount(state, action) {
      state.orderCount = action.payload;
    },
    setOnlineGuards(state, action) {
      state.onlineGuards = action.payload;
    },
  },
});

export const { setOrder, setOrderCount, setOrderList, setOnlineGuards } =
  socketSlice.actions;

export default socketSlice.reducer;