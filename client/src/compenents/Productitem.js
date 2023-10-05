import React, { useState } from 'react';

function ProductItem({ name, price, image, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Retrieve the current cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');

    // Parse the stored cart items or initialize an empty array
    const cart = storedCartItems ? JSON.parse(storedCartItems) : [];

    // Add the current product to the cart array
    cart.push({ name, price });

    // Update the cart data in local storage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    setIsAdded(true);
    onAddToCart(); // Call the onAddToCart function passed as a prop

    // Automatically hide the "Item has been added to the cart!" message after a few seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <div>
      <h1>{name}</h1>
      <img src={process.env.PUBLIC_URL + `/images/${name}.jpeg`} alt={`Product: ${name}`} />

      <p>Price: {price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {isAdded && <p>Item has been added to the cart!</p>}
    </div>
  );
}

export default ProductItem;





