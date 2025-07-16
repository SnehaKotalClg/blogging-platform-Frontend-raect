import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('blog_user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser || null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('blog_user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('blog_user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
