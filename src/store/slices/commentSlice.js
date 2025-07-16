import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const fetchComments = createAsyncThunk('comment/fetchComments', async (postId) => {
  const res = await API.get(`/comments/${postId}`);
  return { postId, comments: res.data };
});

export const addComment = createAsyncThunk('comment/addComment', async ({ postId, comment }) => {
  const res = await API.post(`/comments/${postId}`, comment);
  return { postId, comment: res.data };
});

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    commentsByPost: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsByPost[action.payload.postId] = action.payload.comments;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.commentsByPost[action.payload.postId] = [
          ...(state.commentsByPost[action.payload.postId] || []),
          action.payload.comment,
        ];
      });
  },
});

export default commentSlice.reducer;