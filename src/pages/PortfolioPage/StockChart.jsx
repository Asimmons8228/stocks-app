import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

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

    const fetchChartData = async () => {
        console.log(`Initiating data fetch for symbol: ${symbol}`);
        try {
            const response = await fetch(`/api/stocks/daily?symbol=${encodeURIComponent(symbol)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const fetchedData = await response.json();
            console.log('Fetched data:', fetchedData);
            if (!fetchedData['Time Series (Daily)']) {
                throw new Error('Time Series (Daily) data is not found in the response');
            }
    
            const timeSeriesData = fetchedData['Time Series (Daily)'];
            const labels = Object.keys(timeSeriesData).sort();
            const data = labels.map(date => {
                const entry = timeSeriesData[date];
                return parseFloat(entry['4. close']);
            });
    
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
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        if (symbol) {
            console.log(`Fetching chart data for symbol: ${symbol}`); 
            fetchChartData();
        }
    }, [symbol]); 

    return (
        <div>
            <h2>Stock Chart for {symbol}</h2>
            <Line data={chartData} />
        </div>
    );
};

export default StockChart;
