import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your backend URL

// API call to sign up a user
export const signup = (userData) => {
    return axios.post(`${API_URL}/signup`, userData);
};

// API call to sign in a user
export const signin = (credentials) => {
    return axios.post(`${API_URL}/signin`, credentials);
};

// API call to fetch products
export const const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const signUpUser = async (username, email, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error('Sign-up failed');
  }
  return response.json();
};

export const signInUser = async (email, password) => {
  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Sign-in failed');
  }
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
getProducts = () => {
    return axios.get(`${API_URL}/products`);
};
