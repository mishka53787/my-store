import React, { useState, useEffect } from 'react';
import ProductItem from './Productitem';
import ProductForm from './ProductForm';
import axios from 'axios';

function Products({ userRole }) {
  const [products, setProducts] = useState([]); // Initialize products state with an empty array
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fetchNewData, setFetchNewData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = {
    role: 'admin',
  };

  useEffect(() => {
    setIsAdmin(user.role === 'admin');
  }, [user.role]);

  const handleUserLogin = () => {
    setLoggedIn(true);
  };

  const [showProductForm, setShowProductForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data || []); // Ensure that response.data is an array or initialize as an empty array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const staticProducts = [
    { id: 1, name: 'MyHeroAcademia', price: 'R180' },
    { id: 2, name: 'FairyTail100YearQuest', price: 'R180' },
    { id: 3, name: 'Haikyuu', price: 'R180' },
    { id: 4, name: 'Kakashitshirt', price: 'R200' },
  ];

  const addToCart = (product) => {
    if (isAdmin) {
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      alert('Item added to cart!');
    } else {
      alert('Only admin users can add items to the cart.');
    }
  };

  const addProductToList = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleAddProduct = async (productData) => {
    if (isAdmin) {
      try {
        const response = await axios.post('http://localhost:5000/add-product', productData);

        if (response.status === 201) {
          alert('Product added successfully!');
          setFetchNewData(!fetchNewData); // Toggle fetchNewData to trigger fetching updated products
          setShowProductForm(false);
        } else {
          console.error('Failed to add product:', response.data.error);
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      console.error('Only admin users can add products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchNewData]);

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
      {staticProducts.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          onAddToCart={() => addToCart(product)}
        />
      ))}
      {isAdmin && (
        <button onClick={() => setShowProductForm(!showProductForm)}>
          Add Product
        </button>
      )}
      {isAdmin && showProductForm && (
     <ProductForm onAddProduct={handleAddProduct} onaddproductlist={addProductToList} />
      )}
      {!loggedIn && (
        <button onClick={handleUserLogin}>
          Log In
        </button>
      )}
    </div>
  );
}

export default Products;

