import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

// Function to fetch cart items from local storage
useEffect(() => {
  const storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    // If there are items in local storage, parse and set them in the state
    const parsedCartItems = JSON.parse(storedCartItems);
    setCartItems(parsedCartItems);
    
    // Log the cart items retrieved from local storage
    console.log('Cart items from local storage:', parsedCartItems);
  }
}, []);


  // Function to remove items from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    // Update local storage after removing an item
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    console.log('Clearing the cart');
    setCartItems([]);
    // Clear local storage when clearing the cart
    localStorage.removeItem('cartItems');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default ShoppingCart;








