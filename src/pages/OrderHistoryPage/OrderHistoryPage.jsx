import React, { useEffect, useState } from 'react';
import { getStockData, searchStocks } from '../../utilities/stock-service';

function OrderHistoryPage() {
  const [stockData, setStockData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    async function loadStockData() {
      const data = await getStockData('AAPL');
      setStockData(data);
    }

    loadStockData();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const results = await searchStocks(searchQuery);
    setSearchResults(results);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a ticker..."
        />
        <button type="submit">Search</button>
      </form>
      {searchResults && (
        <div>
          <h2>Search Results:</h2>
          <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        </div>
      )}
      {stockData ? (
        <div>
          <h2>Stock Data:</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  );
}

export default OrderHistoryPage;
