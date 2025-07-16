import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div style={{ width: '400px' }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
