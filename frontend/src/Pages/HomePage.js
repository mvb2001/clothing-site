import React, { useEffect, useState } from 'react';
import { getProducts } from './Services/api';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data.products);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Our Products</h2>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
