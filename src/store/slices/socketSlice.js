import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  orderList: [],
  orderCount: null,
  onlineGuards: null,
  isModalVisible: false,
  requestCount: null,
  requestList: null,
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
    setCompleteModal(state, action){
      state.isModalVisible = action.payload;
    },
    setRequestCount(state, action){
      state.requestCount = action.payload;
    },
    setRequestList(state, action){
      state.requestList = action.payload;
    },
  },
});

export const { setOrder, setOrderCount, setOrderList, setOnlineGuards, setCompleteModal, setRequestCount, setRequestList} =
  socketSlice.actions;

export default socketSlice.reducer;