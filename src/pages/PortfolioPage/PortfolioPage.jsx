import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import { createChart } from 'lightweight-charts';
import StockChart from './StockChart';
import { getToken } from '../../utilities/users-service';


export default function PortfolioPage({user, setUser}) {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [assets, setAssets] = useState([]);
  const [editable, setEditable] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [selectedSymbol, setSelectedSymbol] = useState('');


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





  const handleChange = (e, assetId)=>{
    setAssets( (assets) => 
    assets.map((asset) => 
    asset._id === assetId
    ? {...asset, [e.target.name]: e.target.value}
    : asset
    )
    );
  };
  const toggleEditMode = (assetId) => {
    setEditable(editable === assetId ? null : assetId);
  }
  
  const handleUpdate = async (assetId) => {
    const index = assets.findIndex(asset => asset._id === assetId);
    const updatedAssets = [...assets]
 
    const updatedData = {
    share_balance: updatedAssets[index].share_balance,
    purchase_price: updatedAssets[index].purchase_price,
  };

  updatedAssets[index] = {
    ...updatedAssets[index],
    ...assets[index],
  };
    
    try {
      const response = await fetch(`/api/assets/${assetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedData),
      });

      console.log('After fetch:', assets[index]);

      if (response.ok){
        setAssets(updatedAssets);
        setEditable(null);
      } else {
        console.error('Error updating asset:', response.statusText);
      }
    } catch (error){
      console.error('Error updating asset:', error.message);
    }
  };

    
  const handleDelete = async (assetId) => {
    try {
      const response = await fetch(`/api/assets/${assetId}`, {method: 'Delete'});
      if (response.ok) {
        const updatedAssets = assets.filter((asset) => asset._id !== assetId);
        setAssets(updatedAssets);
      } else {
        console.error('Error deleting asset:', response.statusText);
      }
    }catch(error){
      console.error('Error deleting asset:', error.message);
    }
  };


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
        
        console.log(searchData);
        if (searchData.bestMatches) {
            console.log(searchData.bestMatches); 
        }

        setSearchResults(Array.isArray(searchData) ? searchData : [searchData]);
        if (searchData.bestMatches && searchData.bestMatches.length > 0) {
            console.log(searchData.bestMatches[0]); 
            const symbol = searchData.bestMatches[0]['1. symbol'];
            setSelectedSymbol(symbol);
            console.log(`Selected Symbol in PortfolioPage: ${symbol}`); 
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
        <tr>
         <td>{asset.symbol} </td>

         <td>{editable === asset._id ? <input id='editbox' type='integer' key={asset._id}  value={asset.share_balance} name='share_balance' onChange={(e) => handleChange(e, asset._id)}/> : asset.share_balance}</td>
         <td>{editable === asset._id ? <input id='editbox' type='integer' key={asset._id}   value={asset.purchase_price} name='purchase_price' onChange={(e) => handleChange(e, asset._id)}/> : asset.purchase_price}</td>
         <td>$15,000.00</td>
         <td>$2,500.00</td>
         <td> {editable === asset._id ? (
         <button onClick={() => handleUpdate(asset._id)}>Save</button>
         ) : (
         <button onClick={() => toggleEditMode(asset._id)}>Edit</button>
         )} 
         </td>
         <td>
          <button onClick={() => handleDelete(asset._id)}>Delete</button>
         </td>
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
        {selectedSymbol && <StockChart symbol={selectedSymbol} />}
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
}}