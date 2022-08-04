import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://discoverystudio.xyz:7321';

const initialState = {
  error: '',
  isAuth: false,
  loading: false,
  user: {},
  userList: [],
  guardList: [],
  priceList: [],
  archiveList: []
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async function(user, {rejectWithValue}) {
    try {
      const response = await axios.post(`${url}/auth/login`, user);
      
      const { data: {accessToken} } = response;

      localStorage.setItem('token', accessToken);

      try {
        const login = await axios.get(`${url}/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
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
  'auth/getUserList',
  async function(_, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/user/get-all?roles=PARENT,USER`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

export const patchAlarm = createAsyncThunk(
  'auth/patchAlarm',
  async function({id, status}, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${url}/alarm/${id}`,{status}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        
      });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

export const getGuardList = createAsyncThunk(
  'auth/getGuardList',
  async function(_, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/user/get-all?roles=GUARD`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
)

export const getPrice = createAsyncThunk(
  'auth/getPrice',
  async function(_, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/price`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

export const postPay = createAsyncThunk(
  'auth/postPay',
  async function(data, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${url}/wallet`,
        data,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
        });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

export const postPrice = createAsyncThunk(
  'auth/postPrice',
  async function(data, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${url}/price`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

export const getArchive = createAsyncThunk(
  'auth/getArchive',
  async function(_, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${url}/alarm?status=5,2,3`,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
        });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

export const createGuard = createAsyncThunk(
  'auth/createGuard',
  async function(guard, {rejectWithValue}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${url}/user/guard`,
        guard,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
        });
      
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }

  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.isAuth = false
    }
  },
  extraReducers: {
    [fetchLogin.pending]: state => {
      state.loading = true;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      if (action.payload.role === 'ADMIN') {
        state.user = action.payload;
        state.error = '';
        state.isAuth = true;
      } else {
        state.error = 'Not Admin';
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
      state.userList = action.payload.data;
      console.log(action.payload.data)
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
      state.guardList = action.payload.data;
    },
    [patchAlarm.pending]: (state) => {
      state.loading = true;
    },
    [patchAlarm.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
    [patchAlarm.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
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
      console.log(action.payload);
    },
    [postPay.fulfilled]: (state, action) => {
      console.log(action.payload);
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
      state.error = '';
      state.archiveList = action.payload.data;
    },
    [postPrice.pending]: (state, action) => {
      state.loading = true;
    },
    [postPrice.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [postPrice.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      const price = state.priceList.find(item => item.id === action.payload.id);
      if(price) {
        state.priceList = state.priceList.map(item => {
          if(item.id === action.payload.id) {
            const newItem = action.payload;
            return newItem;
          }
          return item;
        })
      } else {
        state.priceList = [action.payload, ...state.priceList];
      }
    },
    [createGuard.pending]: (state, action) => {
      state.loading = true;
    },
    [createGuard.pending]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createGuard.pending]: (state, action) => {
      state.loading = false;
      state.guardList = [action.payload, ...state.guardList];
    }
  }
})

export const {logout} = authSlice.actions;

export default authSlice.reducer;