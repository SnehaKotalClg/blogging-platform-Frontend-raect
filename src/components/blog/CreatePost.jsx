import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/slices/blogSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', author: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createPost(form));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-3 text-center">Create New Blog</h2>

      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          required
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          name="author"
          className="form-control"
          required
          value={form.author}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Content</label>
        <textarea
          name="content"
          rows={6}
          className="form-control"
          required
          value={form.content}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-success btn-sm px-4">Publish</button>
      </div>
    </form>
  );
};

export default CreatePost;
