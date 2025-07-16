import React, { useState } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/signup', form);
      alert(res.data.message || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3 text-center">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          required
          value={form.username}
          onChange={handleChange}
        />
      </div>

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
        <button type="submit" className="btn btn-success btn-sm px-4">
          Register
        </button>
      </div>

      <div className="text-center mt-3">
        <span>Already have an account? </span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
