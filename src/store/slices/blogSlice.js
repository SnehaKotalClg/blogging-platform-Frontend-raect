import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchPosts = createAsyncThunk('blog/fetchPosts', async () => {
  const res = await API.get('/posts');
  return res.data.map(post => ({
    ...post,
    id: post._id,
  }));
});

export const fetchPostById = createAsyncThunk('blog/fetchPostById', async (id) => {
  const res = await API.get(`/posts/${id}`);
  return { ...res.data, id: res.data._id };
});

export const createPost = createAsyncThunk('blog/createPost', async (post) => {
  const res = await API.post('/posts', post);
  return { ...res.data, id: res.data._id };
});

export const updatePost = createAsyncThunk('blog/updatePost', async ({ id, post }) => {
  const res = await API.put(`/posts/${id}`, post);
  return { ...res.data, id: res.data._id };
});


export const deletePost = createAsyncThunk('blog/deletePost', async (id) => {
  await API.delete(`/posts/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
