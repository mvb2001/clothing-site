import React, { useState } from 'react';
import API from '../api';

function AddClothes() {
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '', image_url: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/clothes', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input name="image_url" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Add Clothes</button>
    </form>
  );
}

export default AddClothes;
