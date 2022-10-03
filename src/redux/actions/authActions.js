import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DELETE, GET, PATCH, POST } from "../../utils/constants";
import { reqFunc } from "../../utils/ReqCreator";

const URL = process.env.REACT_APP_BASE_URL;

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
      const { data } = await reqFunc({
        type: GET,
        url: `/user/get-all?roles=PARENT,USER&take=10`,
        params: {
          page,
          name,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const patchAlarm = createAsyncThunk(
  "auth/patchAlarm",
  async function ({ id, status }, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: PATCH,
        url: `/alarm/${id}`,
        body: { status },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getGuardList = createAsyncThunk(
  "auth/getGuardList",
  async function ({ page, name }, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: GET,
        url: `/user/get-all?roles=GUARD&take=10`,
        params: {
          page,
          name,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getPrice = createAsyncThunk(
  "auth/getPrice",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: GET,
        url: `/price`,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async function (id, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: DELETE,
        url: `/user/delete/${id}`,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const restoreUser = createAsyncThunk(
  "auth/restoreUser",
  async function (id, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: PATCH,
        url: `/user/restore/${id}`,
        body: {},
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postPay = createAsyncThunk(
  "auth/postPay",
  async function (obj, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: POST,
        url: "/wallet",
        body: obj,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postPrice = createAsyncThunk(
  "auth/postPrice",
  async function (obj, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: POST,
        url: "/price",
        body: obj,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getArchive = createAsyncThunk(
  "auth/getArchive",
  async function (params, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: GET,
        url: "/history?status=5",
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createGuard = createAsyncThunk(
  "auth/createGuard",
  async function (guard, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: POST,
        url: "/user/guard",
        body: guard,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const paySubscription = createAsyncThunk(
  "auth/paySubscription",
  async function (id, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: POST,
        url: `/purchase/subscription/${id}`,
        body: {},
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "auth/addComment",
  async function ({ alarmId, comment }, { rejectWithValue }) {
    try {
      const { data } = await reqFunc({
        type: PATCH,
        url: `/alarm/comment/${alarmId}`,
        body: { comment },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
