import React, { useState } from 'react';
import { getStockData, searchStocks } from '../../utilities/stock-service';
import { checkToken } from '../../utilities/users-service';

export default function PortfolioPage({ user, setUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    const results = await searchStocks(searchQuery);
    setSearchResults(results);
  };

  return (
    <>
      <div className='flex'>
        <div id='portfolio-container' className='portfolio-container flex flex-col'>
          <div className='flex items-start flex-col mt-10'>
            <h1 id='welcometext' className='text-white font-bold mb-4'>Welcome, {user.name}</h1>
            <div id='text-box' className='mb-3 mt-3'>
              <h1 className='text-white font-bold p-2'>Current Portfolio</h1>
            </div>
          </div>
          <div id='table-container'>
            <table id='portfolio-table' className="table table-bordered bg-white">
              <thead>
                <tr>
                  <th>Stock Ticker</th>
                  <th className='pr-2'>Shares Amount</th>
                  <th className='pr-2'>Purchase Price</th>
                  <th className='pr-2'>Current Valuation</th>
                  <th className='pr-2'>Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {/* Table rows */}
              </tbody>
            </table>
          </div>
        </div>
        <div id='stock-data-container' className='ml-auto mt-11'>
          <div className='flex'>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                id='searchbox'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a ticker..."
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className='flex-col'>
            {searchResults && (
              <div id='search-results-container'>
                <h2>Search Results:</h2>
                <pre>{JSON.stringify(searchResults, null, 2)}</pre>
              </div>
            )}
            <div id='graph-container'></div>
            <div id='actions' className='flex'>
              <h1 className='font-bold'>Recommended Actions: </h1>
            </div>
            <div className='flex'>
              <h1 id='buyticker'>Buy/Sell </h1>
            </div>
            <div id='actions' className='flex'>
              <h1>Potential profit/loss based upon 52-week high/low</h1>
            </div>
            <div className='flex'>
              <h1 id='buyticker'>60% profit </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


// Original Routing in OrderHistoryPage
// import React, { useEffect, useState } from 'react';
// import { getStockData, searchStocks } from '../../utilities/stock-service';

// function OrderHistoryPage() {
//   const [stockData, setStockData] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState(null);

//   useEffect(() => {
//     async function loadStockData() {
//       const data = await getStockData('AAPL');
//       setStockData(data);
//     }

//     loadStockData();
//   }, []);

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     const results = await searchStocks(searchQuery);
//     setSearchResults(results);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search for a ticker..."
//         />
//         <button type="submit">Search</button>
//       </form>
//       {searchResults && (
//         <div>
//           <h2>Search Results:</h2>
//           <pre>{JSON.stringify(searchResults, null, 2)}</pre>
//         </div>
//       )}
//       {stockData ? (
//         <div>
//           <h2>Stock Data:</h2>
//           <pre>{JSON.stringify(stockData, null, 2)}</pre>
//         </div>
//       ) : (
//         <p>Loading stock data...</p>
//       )}
//     </div>
//   );
// }

// export default OrderHistoryPage;
