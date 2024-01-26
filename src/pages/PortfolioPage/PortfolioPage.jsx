import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { createChart } from "lightweight-charts";
import StockChart from "./StockChart";
import { getToken } from "../../utilities/users-service";

// PortfolioPage component
export default function PortfolioPage({ user, setUser }) {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [assets, setAssets] = useState([]);
  const [editable, setEditable] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  // Effect to initialize the chart when the component mounts
  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const newChart = createChart(chartContainerRef.current, {
        width: 600,
        height: 200,
      });
      const newCandleSeries = newChart.addCandlestickSeries();
      chartRef.current = newChart;
      candleSeriesRef.current = newCandleSeries;
    }

    return () => {
      // Cleanup function to remove the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  // Effect to update candlestick chart data when timeSeriesData changes
  useEffect(() => {
    if (candleSeriesRef.current && timeSeriesData) {
      candleSeriesRef.current.setData(timeSeriesData);
    }
  }, [timeSeriesData]);

  // Handle input change for editable fields
  const handleChange = (e, assetId) => {
    setAssets((assets) =>
      assets.map((asset) =>
        asset._id === assetId
          ? { ...asset, [e.target.name]: e.target.value }
          : asset
      )
    );
  };

  // Toggle edit mode for a specific asset
  const toggleEditMode = (assetId) => {
    setEditable(editable === assetId ? null : assetId);
  };

  // Handle update for an asset
  const handleUpdate = async (assetId) => {
    // Fetch the asset index and create a copy of assets array
    const index = assets.findIndex((asset) => asset._id === assetId);
    const updatedAssets = [...assets];

    // Prepare updated data for the asset
    const updatedData = {
      share_balance: updatedAssets[index].share_balance,
      purchase_price: updatedAssets[index].purchase_price,
    };

    updatedAssets[index] = {
      ...updatedAssets[index],
      ...assets[index],
    };

    try {
      // Send a PUT request to update the asset on the server
      const response = await fetch(`/api/assets/${assetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedData),
      });

      console.log("After fetch:", assets[index]);

      if (response.ok) {
        setAssets(updatedAssets);
        setEditable(null);
      } else {
        console.error("Error updating asset:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating asset:", error.message);
    }
  };

  // Handle delete for an asset
  const handleDelete = async (assetId) => {
    try {
      // Send a DELETE request to remove the asset from the server
      const response = await fetch(`/api/assets/${assetId}`, {
        method: "Delete",
      });
      if (response.ok) {
        const updatedAssets = assets.filter((asset) => asset._id !== assetId);
        setAssets(updatedAssets);
      } else {
        console.error("Error deleting asset:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting asset:", error.message);
    }
  };

  // Fetch time series data for a given stock symbol
  const fetchTimeSeriesData = async (symbol) => {
    try {
      // Fetch daily stock data for the specified symbol
      const response = await fetch(
        `/api/stocks/daily?symbol=${encodeURIComponent(symbol)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response and format the data for chart
      const rawData = await response.json();
      const formattedData = rawData.map((dataPoint) => ({
        time: dataPoint.date,
        open: parseFloat(dataPoint.open),
        high: parseFloat(dataPoint.high),
        low: parseFloat(dataPoint.low),
        close: parseFloat(dataPoint.close),
      }));

      // Update time series data state
      setTimeSeriesData(formattedData);
    } catch (error) {
      console.error("Error fetching time series data:", error);
    }
  };

  // Handle stock search
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      // Fetch stock search results based on the search term
      const searchResponse = await fetch(
        `/api/stocks/search?keywords=${encodeURIComponent(searchTerm)}`
      );
      const searchData = await searchResponse.json();

      console.log(searchData);
      if (searchData.bestMatches) {
        console.log(searchData.bestMatches);
      }

      // Update search results state
      setSearchResults(Array.isArray(searchData) ? searchData : [searchData]);
      if (searchData.bestMatches && searchData.bestMatches.length > 0) {
        console.log(searchData.bestMatches[0]);
        const symbol = searchData.bestMatches[0]["1. symbol"];
        setSelectedSymbol(symbol);
        console.log(`Selected Symbol in PortfolioPage: ${symbol}`);
        fetchTimeSeriesData(symbol);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Render the PortfolioPage component
  return (
    <>
      <div className="flex">
        <div
          id="portfolio-container"
          className="portfolio-container flex flex-col"
        >
          <div className="flex items-start flex-col mt-10">
            <h1 id="welcometext" className="text-white font-bold mb-4">
              Welcome, {user.name}
            </h1>
            <div id="text-box" className="mb-3 mt-2">
              <h1 className="text-white font-bold p-2">Current Portfolio</h1>
            </div>
          </div>
          <div id="table-container" className="justify-between">
            <table
              id="portfolio-table"
              className="table table-bordered  bg-white justify-between"
            >
              <thead>
                <tr className="justify-between">
                  <th className="">Stock Ticker</th>
                  <th className="pr-2">Shares Amount</th>
                  <th className="pr-2">Purchase Price</th>
                  <th className="pr-2">Valuation</th>
                  <th className="pr-2">Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset._id}>
                    <td>{asset.symbol} </td>
                    <td>
                      {editable === asset._id ? (
                        <input
                          id="editbox"
                          type="integer"
                          value={asset.share_balance}
                          name="share_balance"
                          onChange={(e) => handleChange(e, asset._id)}
                        />
                      ) : (
                        asset.share_balance
                      )}
                    </td>
                    <td>
                      {editable === asset._id ? (
                        <input
                          id="editbox"
                          type="integer"
                          value={asset.purchase_price}
                          name="purchase_price"
                          onChange={(e) => handleChange(e, asset._id)}
                        />
                      ) : (
                        asset.purchase_price
                      )}
                    </td>
                    <td>${asset.share_balance * asset.purchase_price}</td>
                    <td>$2,500.00</td>
                    <td>
                      {editable === asset._id ? (
                        <button onClick={() => handleUpdate(asset._id)}>
                          Save
                        </button>
                      ) : (
                        <button onClick={() => toggleEditMode(asset._id)}>
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(asset._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex">
            <h1
              className="text-white font-bold mr-3 mt-3 mb-3 p-1"
              id="assetbutton"
            >
              <Link to={"/asset/new"}>Add Asset</Link>
            </h1>
          </div>
        </div>

        <div id="stock-data-container" className="ml-auto mt-11">
          <div className="flex">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                id="searchbox"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stock symbol..."
              />
              <button
                type="submit"
                style={{
                  color: "black",
                  backgroundColor: "white",
                  border: "1px solid black",
                  borderRadius: "40px",
                  padding: "8px 1px",
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </form>
          </div>
          {selectedSymbol && <StockChart symbol={selectedSymbol} />}
          <div id="actions" className="flex">
            <h1 className="font-bold">Recommended Actions: </h1>
          </div>
          <div className="flex">
            <h1 id="buyticker">Buy/Sell </h1>
          </div>
        </div>
      </div>
    </>
  );
}
