import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchArticleList = createAsyncThunk('articles/fetchArticleList', async ({ limit, offset } => {
    const res = await axios.get('https://blog.kata.academy/api/articles', {
        params: {limit, offset},
        headers: {'Content-Type': 'application/json;charset=utf-8', }
    })
}));

const initialState = {
  articleList: [],
  currentPage: 1,
  totalPage: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
});

// export const {} = articlesSlice.actions;

export default articlesSlice;
