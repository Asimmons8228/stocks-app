import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Global options for the Chart.js instance
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

// Sample labels for the chart (to be replaced with fetched data)
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Register necessary components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// StockChart component
const StockChart = ({ symbol }) => {
    console.log(`StockChart symbol prop: ${symbol}`);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Stock Price',
                data: [],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });

    // Function to fetch chart data from the server
    const fetchChartData = async () => {
        console.log(`Initiating data fetch for symbol: ${symbol}`);
        try {
            // Fetch daily stock data for the specified symbol
            const response = await fetch(`/api/stocks/daily?symbol=${encodeURIComponent(symbol)}`);

            // Check if the response is successful; throw an error if not
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            const fetchedData = await response.json();
            console.log('Fetched data:', fetchedData);

            // Check if the required data structure is present in the response
            if (!fetchedData['Time Series (Daily)']) {
                throw new Error('Time Series (Daily) data is not found in the response');
            }

            // Extract and process time series data for the chart
            const timeSeriesData = fetchedData['Time Series (Daily)'];
            const labels = Object.keys(timeSeriesData).sort();
            const data = labels.map(date => {
                const entry = timeSeriesData[date];
                return parseFloat(entry['4. close']);
            });

            // Update the chart data state with fetched data
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: `${symbol} Stock Price`,
                        data: data,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            });
        } catch (error) {
            // Log and handle errors during data fetching
            console.error('Error fetching chart data:', error);
        }
    };

    // Use useEffect to initiate chart data fetching when the symbol prop changes
    useEffect(() => {
        if (symbol) {
            console.log(`Fetching chart data for symbol: ${symbol}`);
            fetchChartData();
        }
    }, [symbol]);

    // Render the StockChart component
    return (
        <div>
            <h2>Stock Chart for {symbol}</h2>
            <Line options={options} data={chartData} />
        </div>
    );
};

// Export the StockChart component as the default export
export default StockChart;

