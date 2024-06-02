import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

import { getCookie, deleteCookie } from '../components/cookie';

export const fetchCreateUser = createAsyncThunk('users/fetchCreateUser', async (user) => {
  try {
    const res = await axios.post(
      'https://blog.kata.academy/api/users',
      {
        user,
      },
      { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
    );
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchLoginUser = createAsyncThunk('users/fetchLoginUser', async (user) => {
  try {
    const res = await axios.post(
      'https://blog.kata.academy/api/users/login',
      {
        user,
      },
      { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
    );
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchUpdateUser = createAsyncThunk('users/fetchUpdateUser', async (user) => {
  try {
    const res = await axios.put(
      'https://blog.kata.academy/api/user',
      {
        user,
      },
      { headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` } }
    );
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchGetUser = createAsyncThunk('users/fetchGetUser', async () => {
  try {
    const res = await axios.get('https://blog.kata.academy/api/user', {
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

const initialState = {
  username: '',
  email: '',
  bio: '',
  image: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOutProfile: (state) => {
      state.username = '';
      state.email = '';
      state.image = '';
      deleteCookie('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        document.cookie = `Token=${action.payload.user.token}`;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.bio = action.payload.user.bio;
        state.image = action.payload.user.image;
        document.cookie = `token = ${action.payload.user.token}`;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.image = action.payload.user.image;
        document.cookie = `token = ${action.payload.user.token}`;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.image = action.payload.user.image;
        document.cookie = `token = ${action.payload.user.token}`;
      })
      .addDefaultCase(() => {});
  },
});

// eslint-disable-next-line no-empty-pattern
export const { logOutProfile } = usersSlice.actions;
export default usersSlice;
