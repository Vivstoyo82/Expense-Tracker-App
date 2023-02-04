import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './loginSlice';
import expenseReducer from './expenseSlice';
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: { login: loginReducer, expense: expenseReducer, theme: themeSlice, },
});

export default store;