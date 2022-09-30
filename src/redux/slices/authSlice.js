import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { addComment, createGuard, deleteUser, fetchLogin, getArchive, getGuardList, getPrice, getUserList, patchAlarm, paySubscription, postPay, postPrice, restoreUser } from "../actions/authActions";

const token = localStorage.getItem("token") || null;

const initialState = {
  error: "",
  isAuth: token || false,
  loading: false,
  user: {},
  userList: [],
  guardList: [],
  priceList: [],
  archiveList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.isAuth = false;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.loading = true;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      if (action.payload.role === "ADMIN") {
        state.user = action.payload;
        state.error = "";
        state.isAuth = true;
      } else {
        state.error = "Not Admin";
      }
      state.loading = false;
    },
    [getUserList.pending]: (state) => {
      state.loading = true;
    },
    [getUserList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    },
    [getGuardList.pending]: (state) => {
      state.loading = true;
    },
    [getGuardList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getGuardList.fulfilled]: (state, action) => {
      state.loading = false;
      state.guardList = action.payload;
    },
    [patchAlarm.pending]: (state) => {
      state.loading = true;
    },
    [patchAlarm.rejected]: (state) => {
      state.loading = false;
    },
    [patchAlarm.fulfilled]: (state) => {
      state.loading = false;
    },
    [getPrice.pending]: (state) => {
      state.loading = true;
    },
    [getPrice.rejected]: (state) => {
      state.loading = false;
    },
    [getPrice.fulfilled]: (state, action) => {
      state.loading = false;
      state.priceList = action.payload;
    },
    [postPay.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.userList.data = state.userList.data.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    [getArchive.pending]: (state) => {
      state.loading = true;
    },
    [getArchive.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getArchive.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.archiveList = action.payload;
    },
    [postPrice.pending]: (state) => {
      state.loading = true;
      notification.success({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: "Успешно опубликовано",
      });
    },
    [postPrice.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      notification.error({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: state.error,
      });
    },
    [postPrice.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      const price = state.priceList.find(
        (item) => item.id === action.payload.id
      );
      if (price) {
        state.priceList = state.priceList.map((item) => {
          if (item.id === action.payload.id) {
            const newItem = action.payload;
            return newItem;
          }
          return item;
        });
      } else {
        state.priceList = [action.payload, ...state.priceList];
      }
    },
    [createGuard.pending]: (state) => {
      state.loading = true;
    },
    [createGuard.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      notification.error({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: action.payload,
      });
    },
    [createGuard.fulfilled]: (state, action) => {
      state.loading = false;
      state.guardList.data = [...state.guardList.data, action.payload];
      state.guardList.count += 1;

      notification.success({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: "Пользователь успешно создан",
      });
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      notification.success({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: action.payload,
      });
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.guardList.data = state.guardList.data.map((guard) => {
        if (guard.id === action.payload.id) {
          return action.payload;
        }
        return guard;
      });

      notification.success({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: "Пользователь успешно удалён",
      });
    },
    [restoreUser.pending]: (state) => {
      state.loading = true;
    },
    [restoreUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [restoreUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.guardList.data = state.guardList.data.map((guard) => {
        if (guard.id === action.payload.id) {
          return action.payload;
        }

        return guard;
      });

      notification.success({
        placement: "topRight",
        top: 50,
        duration: 3,
        rtl: true,
        message: "Пользователь успешно восстановлен",
      });
    },

    [paySubscription.pending]: (state) => {
      state.loading = true;
    },
    [paySubscription.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [paySubscription.fulfilled]: (state) => {
      state.loading = false;
      // state.guardList.data = [action.payload, ...state.guardList.data];
    },
    [addComment.pending]: (state) => {
      state.loading = true;
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.archiveList.data = state.archiveList.data.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, comment: action.payload.comment };
        }
        return item;
      });
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
