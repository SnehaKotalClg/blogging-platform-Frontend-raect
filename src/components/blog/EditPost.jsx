import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, updatePost } from '../../store/slices/blogSlice';

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost } = useSelector((state) => state.blog);
  const [form, setForm] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPost) {
      setForm({
        title: currentPost.title || '',
        content: currentPost.content || '',
        author: currentPost.author || '',
      });
    }
  }, [currentPost]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePost({ id, post: form }));
    navigate('/');
  };

  if (!currentPost) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-3 text-center">Edit Post</h2>

      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          name="author"
          className="form-control"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Content</label>
        <textarea
          name="content"
          className="form-control"
          rows={6}
          value={form.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary btn-sm px-4">
          Update Post
        </button>
      </div>
    </form>
  );
};

export default EditPost;
