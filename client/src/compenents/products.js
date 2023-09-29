import React, { useState, useEffect } from 'react';
import ProductItem from './Productitem'; // Ensure the filename and case match
import ProductForm from './ProductForm';

function Products() {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch products (simulated data)
  const fetchProducts = () => {
    // Simulate fetching products from an API
    const fetchedProducts = [
      { id: 1, name: 'MyHeroAcademia', price: 'R180' },
      { id: 2, name: 'FairyTail100YearQuest', price: 'R180' },
      { id: 3, name: 'Haikyuu', price: 'R180' },
      { id: 4, name: 'Kakashitshirt', price: 'R200' },
      // Add more products as needed
    ];

    setProducts(fetchedProducts);
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  // Function to handle adding a new product
  const handleAddProduct = (newProduct) => {
    // Implement logic to add the new product to the products list
    // For example, you can make an API request to your server here
    console.log('Adding new product:', newProduct);
  };

  // Call the fetchProducts function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          onAddToCart={() => addToCart(product)}
        />
      ))}
      <ProductForm onAddProduct={handleAddProduct} />
    </div>
  );
}

export default Products;




