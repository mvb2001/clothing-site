import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importing the CSS file

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', formData);
      localStorage.setItem('token', res.data.token);
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
