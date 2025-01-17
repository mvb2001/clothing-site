import React, { useEffect, useState } from 'react';
import API from '../api';

function Home() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await API.get('/clothes');
        setClothes(res.data);
      } catch (err) {
        alert('Error fetching clothes');
      }
    };
    fetchClothes();
  }, []);

  return (
    <div>
      <h1>Clothes</h1>
      <ul>
        {clothes.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
