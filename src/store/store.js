import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articles from './articlesSlice';
import users from './usersSlice';

const store = configureStore({
  reducer: combineReducers({ articles: articles.reducer, users: users.reducer }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
