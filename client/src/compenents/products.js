import React, { useState, useEffect } from 'react';
import ProductItem from './Productitem';
import ProductForm from './ProductForm';
import axios from 'axios';

function Products({ userRole }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const user = {
    role: 'admin', // This can be 'admin', 'user', or any other role
  };

  const isAdmin = user && user.role === 'admin';

  // State to manage product data and form visibility
  const [showProductForm, setShowProductForm] = useState(false);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Static products data
  const staticProducts = [
    { id: 1, name: 'MyHeroAcademia', price: 'R180' },
    { id: 2, name: 'FairyTail100YearQuest', price: 'R180' },
    { id: 3, name: 'Haikyuu', price: 'R180' },
    { id: 4, name: 'Kakashitshirt', price: 'R200' },
    // Add more static products as needed
  ];

  const addToCart = (product) => {
    // Create a new array with the added product
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
  };

  // Function to handle adding a new product
  const handleAddProduct = async (productData) => {
    try {
      // Send a POST request to your backend route for adding a product
      const response = await axios.post('http://localhost:5000/add-product', productData);

      // If the product is successfully added, update the product list
      if (response.status === 201) {
        fetchProducts(); // Refresh the product list
        setShowProductForm(false); // Hide the product form
      } else {
        console.error('Failed to add product:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {/* Display products from the API */}
      {products.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          onAddToCart={() => addToCart(product)}
        />
      ))}
      {/* Display static products */}
      {staticProducts.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          onAddToCart={() => addToCart(product)}
        />
      ))}
      {/* Render the "Add Product" button only if the user has admin privileges */}
      {isAdmin && (
        <button onClick={() => setShowProductForm(!showProductForm)}>
          Add Product
        </button>
      )}

      {/* Conditionally render the "Add Product" form only for admin users */}
      {isAdmin && showProductForm && (
        <ProductForm onAddProduct={handleAddProduct} />
      )}
    </div>
  );
}

export default Products;





  




