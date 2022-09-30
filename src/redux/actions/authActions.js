import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    async function ({ userId, comment }, { rejectWithValue }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${URL}/alarm/comment/${userId}`,
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