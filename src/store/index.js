import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    comments: commentReducer,
  },
});

export default store;
