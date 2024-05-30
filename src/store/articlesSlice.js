import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

import { getCookie } from '../components/cookie';

export const fetchArticleList = createAsyncThunk('articles/fetchArticleList', async ({ limit, offset }) => {
  try {
    const res = await axios.get('https://blog.kata.academy/api/articles', {
      params: {
        limit,
        offset,
      },
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchSinglePage = createAsyncThunk('articles/fetchSinglePage', async (slug) => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

const initialState = {
  articleList: [],
  articleSinglePage: null,
  articlesCount: null,
  loading: false,
  error: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticleList.fulfilled, (state, action) => {
        state.loading = false;
        state.articleList = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticleList.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchSinglePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSinglePage.fulfilled, (state, action) => {
        state.loading = false;
        state.articleSinglePage = action.payload.article;
      })
      .addCase(fetchSinglePage.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addDefaultCase(() => {});
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = articlesSlice.actions;
export default articlesSlice;
