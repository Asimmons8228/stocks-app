import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import { createChart } from 'lightweight-charts';


export default function PortfolioPage({user, setUser}) {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [assets, setAssets] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const newChart = createChart(chartContainerRef.current, { width: 600, height: 200 });
      const newCandleSeries = newChart.addCandlestickSeries();
      chartRef.current = newChart;
      candleSeriesRef.current = newCandleSeries;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (candleSeriesRef.current && timeSeriesData) {
      candleSeriesRef.current.setData(timeSeriesData);
    }
  }, [timeSeriesData]);
  const fetchTimeSeriesData = async (symbol) => {
    try {
      const response = await fetch(`/api/stocks/daily?symbol=${encodeURIComponent(symbol)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const rawData = await response.json();
      const formattedData = rawData.map(dataPoint => ({
        time: dataPoint.date, 
        open: parseFloat(dataPoint.open),
        high: parseFloat(dataPoint.high),
        low: parseFloat(dataPoint.low),
        close: parseFloat(dataPoint.close),
      }));
  
      setTimeSeriesData(formattedData); 
    } catch (error) {
      console.error('Error fetching time series data:', error);
    }
  };
  

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const searchResponse = await fetch(`/api/stocks/search?keywords=${encodeURIComponent(searchTerm)}`);
      const searchData = await searchResponse.json();
      setSearchResults(Array.isArray(searchData) ? searchData : [searchData]);
      if (searchData.bestMatches && searchData.bestMatches.length > 0) {
        const symbol = searchData.bestMatches[0]['1. symbol']; 
        fetchTimeSeriesData(symbol);
      }
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
      <div id='table-container' className='justify-between'>
        <table id='portfolio-table' className="table table-bordered  bg-white justify-between">
     <thead>
        <tr className='justify-between'>
          <th className=''>Stock Ticker</th>
          <th className='pr-2'>Shares Amount</th>
          <th className='pr-2'>Purchase Price</th>
          <th className='pr-2'>Current Valuation</th>
          <th className='pr-2'>Profit/Loss</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
        <tr key={asset._id}>
         <td>{asset.symbol}</td>
         <td>{asset.share_balance}</td>
         <td>{asset.purchase_price}</td>
         <td>$15,000.00</td>
         <td>$2,500.00</td>
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
        <div id='graph-container' ref={chartContainerRef}></div>
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