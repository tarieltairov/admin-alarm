import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";

const token = localStorage.getItem("token") || null;
const URL = process.env.REACT_APP_BASE_URL;

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

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async function (user, { rejectWithValue }) {
    try {
      const response = await axios.post(`${URL}/auth/login`, user);

      const {
        data: { accessToken },
      } = response;
      try {
        const login = await axios.get(`${URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        localStorage.setItem("token", accessToken);
        return login.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserList = createAsyncThunk(
  "auth/getUserList",
  async function ({ page, name }, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${URL}/user/get-all?roles=PARENT,USER&take=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            name,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const patchAlarm = createAsyncThunk(
  "auth/patchAlarm",
  async function ({ id, status }, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${URL}/alarm/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getGuardList = createAsyncThunk(
  "auth/getGuardList",
  async function ({ page, name }, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${URL}/user/get-all?roles=GUARD&take=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            name,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getPrice = createAsyncThunk(
  "auth/getPrice",
  async function (_, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${URL}/price`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async function (id, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${URL}/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const restoreUser = createAsyncThunk(
  "auth/restoreUser",
  async function (id, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${URL}/user/restore/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postPay = createAsyncThunk(
  "auth/postPay",
  async function (data, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${URL}/wallet`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postPrice = createAsyncThunk(
  "auth/postPrice",
  async function (data, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${URL}/price`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getArchive = createAsyncThunk(
  "auth/getArchive",
  async function (params, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${URL}/history?status=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params
      });


      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createGuard = createAsyncThunk(
  "auth/createGuard",
  async function (guard, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${URL}/user/guard`, guard, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const paySubscription = createAsyncThunk(
  "auth/paySubscription",
  async function (id, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${URL}/purchase/subscription/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "auth/addComment",
  async function ({ alarmId, comment }, { rejectWithValue }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${URL}/alarm/comment/${alarmId}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
    [patchAlarm.rejected]: (state, action) => {
      state.loading = false;
    },
    [patchAlarm.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [getPrice.pending]: (state) => {
      state.loading = true;
    },
    [getPrice.rejected]: (state, action) => {
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
    [postPrice.pending]: (state, action) => {
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
    [deleteUser.pending]: (state, action) => {
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
    [restoreUser.pending]: (state, action) => {
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

    [paySubscription.pending]: (state, action) => {
      state.loading = true;
    },
    [paySubscription.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [paySubscription.fulfilled]: (state, action) => {
      state.loading = false;
      // state.guardList.data = [action.payload, ...state.guardList.data];
    },
    [addComment.pending]: (state, action) => {
      state.loading = true;
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false;

      state.archiveList.data = state.archiveList.data.map((item) => {
        if (item.alarm.id === action.payload.id) {
          return { ...item, alarm: {...item.alarm,comment: action.payload.comment} };
        }
        return item;
      });
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
