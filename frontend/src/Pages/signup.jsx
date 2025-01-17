import React, { useState } from 'react';
import API from '../api';
import './signup.css';


function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await API.post('/signup', formData);
      alert(res.data.message); // Notify success
      setFormData({ username: '', email: '', password: '', role: 'customer' }); // Reset form
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create an Account</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
