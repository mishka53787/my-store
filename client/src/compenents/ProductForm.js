import React, { useState } from 'react';

function ProductForm({ onAddProduct, onaddproductlist }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageURL: '', // Added imageURL field
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the product data to the server for creation
    onAddProduct(productData);
    onaddproductlist(productData); 
    // Clear the form fields
    setProductData({
      name: '',
      description: '',
      price: '',
      imageURL: '', // Clear imageURL field
      // Clear other fields as needed
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={productData.name}
        onChange={handleInputChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={productData.description}
        onChange={handleInputChange}
        placeholder="Product Description"
      />
      <input
        type="number"
        name="price"
        value={productData.price}
        onChange={handleInputChange}
        placeholder="Product Price"
      />
      {/* Added input field for imageURL */}
      <input
        type="text"
        name="imageURL"
        value={productData.imageURL}
        onChange={handleInputChange}
        placeholder="Image URL"
      />
      {/* Add more fields as needed */}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
