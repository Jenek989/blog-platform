import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articles from './articlesSlice';

const store = configureStore({
  reducer: combineReducers({ articles: articles.reducer }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
