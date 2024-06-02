import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

import { getCookie } from '../components/cookie';

export const fetchArticleList = createAsyncThunk('articles/fetchArticleList', async ({ limit, offset }) => {
  try {
    const res = await axios.get('https://blog.kata.academy/api/articles', {
      params: { limit, offset },
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchSinglePage = createAsyncThunk('articles/fetchSinglePage', async (slug) => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchCreateArticle = createAsyncThunk('articles/fetchCreateArticle', async (body) => {
  try {
    const res = await axios.post(
      'https://blog.kata.academy/api/articles',
      {
        article: body,
      },
      { headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` } }
    );
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchUpdateArticle = createAsyncThunk('articles/fetchUpdateArticle', async ({ body, slug }) => {
  try {
    const res = await axios.put(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        article: body,
      },
      { headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` } }
    );
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (slug) => {
  try {
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchFavoriteArticle = createAsyncThunk('articles/fetchFavoriteArticle', async (slug) => {
  try {
    const res = await axios.post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
      }
    );
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const fetchUnfavoriteArticle = createAsyncThunk('articles/fetchUnfavoriteArticle', async (slug) => {
  try {
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    });
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

const initialState = {
  articleList: [],
  articleSinglePage: null,
  articlesCount: null,
  currentPage: 1,
  loading: false,
  error: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.articleList = [];
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
        state.articleSinglePage = [];
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
      .addCase(fetchCreateArticle.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchUpdateArticle.rejected, (state) => {
        state.error = true;
      })
      .addDefaultCase(() => {});
  },
});

export const { setCurrentPage } = articlesSlice.actions;
export default articlesSlice;
