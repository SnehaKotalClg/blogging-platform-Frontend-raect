import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div style={{ width: '400px' }}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
