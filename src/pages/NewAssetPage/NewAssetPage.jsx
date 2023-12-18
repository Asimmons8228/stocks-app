import { Link } from "react-router-dom";
import { useState } from "react";
import { Component } from "react";

export default function NewAssetPage() {
  const [formData, setFormData] = useState({
  symbol: '',
  name: '',
  purchase_price: '',
  share_balance: '',
});
  const handleSubmit = (e) => {
    e.preventDefault("");

    // Log the form data
    console.log('Submitted Data:', formData);
  };
  return (
      <div id='signupform' className='flex flex-col items-center justify-center'>
        
        <div className="signupform-container">
            <h1 className='text-white font-bold text-xl mb-2'>Add Asset to your Portfolio</h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label className='font-bold text-white'>Stock Name</label>
            <input id='assetinput' type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
            <label  className='font-bold text-white'>Stock Ticker</label>
            <input id='assetinput' type="text" name="symbol" value={formData.symbol} onChange={(e) => setFormData({...formData, symbol: e.target.value})}/>
            <label className='font-bold text-white'>Share Balance</label>
            <input id='assetinput' type="integer" name="share_balance" value={formData.share_balance} onChange={(e) => setFormData({...formData, share_balance: e.target.value})}/>
            <label className='font-bold text-white'>Purchase Price</label>
            <input id='assetinput' type="integer" name="purchase_price" value={formData.purchase_price} onChange={(e)=> setFormData({...formData, purchase_price: e.target.value})}  />
            <button id='signupbtn' type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
  );
}