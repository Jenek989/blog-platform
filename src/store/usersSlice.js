import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// import { getCookie } from '../components/cookie';

export const fetchCreateUser = createAsyncThunk('users/fetchCreateUser', async (user) => {
  try {
    const res = await axios.post('https://blog.kata.academy/api/users', {
      user,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchLoginUser = createAsyncThunk('users/fetchLoginUser', async (user) => {
  try {
    const res = await axios.post('https://blog.kata.academy/api/users/login', {
      user,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

const initialState = {
  userName: '',
  email: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.userName = action.payload.user.username;
        state.email = action.payload.user.email;
        document.cookie = `Token=${action.payload.user.token}`;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userName = action.payload.user.username;
        state.email = action.payload.user.email;
        document.cookie = `token = ${action.payload.user.token}`;
      })
      .addDefaultCase(() => {});
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = usersSlice.actions;
export default usersSlice;
