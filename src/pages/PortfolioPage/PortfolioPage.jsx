import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function PortfolioPage({user, setUser}) {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/stocks/search?keywords=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data : [data]); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  return (
    <>
    <div className='flex'>
      <div id='portfolio-container' className='portfolio-container flex flex-col'>
        <div className='flex items-start flex-col mt-10'>
      <h1 id='welcometext' className='text-white font-bold mb-4'>Welcome, {user.name}</h1>
      <div id='text-box' className='mb-3 mt-2'><h1 className='text-white font-bold p-2'>Current Portfolio</h1></div>
      </div>
      <div id='table-container'>
        <table id='portfolio-table' className="table table-bordered bg-white">
          <thead>
            <tr>
              <th>Stock Ticker</th>
              <th>Shares Amount</th>
              <th>Purchase Price</th>
              <th>Current Valuation</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((asset, index) => (
              <tr key={index}>
                <td>{asset.symbol}</td>
                <td>{asset.sharesAmount}</td>
                <td>${asset.purchasePrice.toFixed(2)}</td>
                <td>${asset.currentValuation.toFixed(2)}</td>
                <td>${(asset.currentValuation - (asset.purchasePrice * asset.sharesAmount)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
    </table>
      </div>
          <div  className='flex'>
        <h1 className='text-white font-bold mr-3 mt-3 mb-3 p-1' id='assetbutton'><Link to={'/asset/new'}>Add Asset</Link></h1>
        <h1 className='text-white font-bold m-3 p-1' id='assetbutton'><Link to={'/asset/edit'}>Edit Assets</Link></h1>
        </div>
  </div>
      <div id='stock-data-container' className='ml-auto mt-11'>
        <div className='flex'>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id='searchbox'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a stock..."
            />
            <button type="submit" style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', borderRadius: '40px', padding: '8px 1px', cursor: 'pointer' }}>Search</button>
          </form>
        </div>
        <div className='flex-col'>
          <div id='graph-container'></div>
        </div>
        <div id='actions' className='flex'>
          <h1 className='font-bold'>Recommended Actons: </h1>
        </div>
        <div  className='flex'>
        <h1 id='buyticker'>Buy/Sell </h1>
        </div>
        <div id='actions' className='flex'>
          <h1>Potential profit/loss based upon 52-week high/low</h1>
        </div>
        <div  className='flex'>
        <h1 id='buyticker'>60% profit </h1>
        </div>
      </div>
      </div>
    </>
  );
}