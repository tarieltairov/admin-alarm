import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import socketSlice from "./slices/socketSlice";

const rootReducer = {
  auth: authSlice,
  socket: socketSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
