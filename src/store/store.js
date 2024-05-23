import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlesSlice from './articlesSlice';

const store = configureStore({
  reducer: combineReducers({ articles: articlesSlice.reducer }),
});

export default store;
