import React, { useState } from 'react';
import ProductForm from './ProductForm'; // Import the ProductForm component

function AdminDashboard() {
  const [showProductForm, setShowProductForm] = useState(false);

  // Function to toggle the product form visibility
  const toggleProductForm = () => {
    setShowProductForm(!showProductForm);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={toggleProductForm}>Add Product</button>

      {/* Conditionally render the ProductForm component */}
      {showProductForm && (
        <ProductForm onAddProduct={(productData) => console.log('Adding new product:', productData)} />
      )}
    </div>
  );
}

export default AdminDashboard;


  
