import React, { useState } from 'react';
import API from '../../utils/api';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', form);
      const { email, username, token } = res.data;
      const user = { email, username };

      localStorage.setItem('token', token);
      dispatch(login(user));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3 text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          required
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary btn-sm px-4">
          Login
        </button>
      </div>

      <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
