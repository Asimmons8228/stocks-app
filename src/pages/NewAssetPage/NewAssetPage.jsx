import { Link } from "react-router-dom";
import { useState } from "react";
import { Component } from "react";
import {getToken} from "../../utilities/users-service";

// NewAssetPage component for adding a new asset to the portfolio
export default function NewAssetPage() {
  // State to manage form data
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    purchase_price: '',
    share_balance: '',
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault("");

    try {
      // Send a POST request to add a new asset
      const response = await fetch('/api/assets/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Parse response data on success
        const data = await response.json();
        console.log('Stock added:', data);

        // Clear the form after successful submission
        setFormData({
          symbol: '',
          name: '',
          purchase_price: '',
          share_balance: '',
        });
      } else {
        console.error('Error adding stock:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding stock:', error.message);
    }

    // Log the form data
    console.log('Submitted Data:', formData);
  };

  // Render the NewAssetPage component
  return (
    <div id='signupform' className='flex flex-col items-center justify-center'>
      <div className="signupform-container">
        <h1 className='text-white font-bold text-xl mb-2'>Add Asset to your Portfolio</h1>
        {/* Asset submission form */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Stock Name input */}
          <label className='font-bold text-white'>Stock Name</label>
          <input
            id='assetinput'
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {/* Stock Ticker input */}
          <label className='font-bold text-white'>Stock Ticker</label>
          <input
            id='assetinput'
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={(e) => setFormData({...formData, symbol: e.target.value})}
          />
          {/* Share Balance input */}
          <label className='font-bold text-white'>Share Balance</label>
          <input
            id='assetinput'
            type="integer"
            name="share_balance"
            value={formData.share_balance}
            onChange={(e) => setFormData({...formData, share_balance: e.target.value})}
          />
          {/* Purchase Price input */}
          <label className='font-bold text-white'>Purchase Price</label>
          <input
            id='assetinput'
            type="integer"
            name="purchase_price"
            value={formData.purchase_price}
            onChange={(e) => setFormData({...formData, purchase_price: e.target.value})}
          />
          {/* Submit button */}
          <button id='signupbtn' type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
