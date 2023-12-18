import React, { useEffect, useState } from 'react';
import { getStockData } from '../../utilities/stock-service';

function OrderHistoryPage() {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    async function loadStockData() {
      const data = await getStockData('AAPL'); 
      setStockData(data);
    }

    loadStockData();
  }, []);
  return (
    <div>
      {stockData ? (
        <div>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  );
}

export default OrderHistoryPage;
