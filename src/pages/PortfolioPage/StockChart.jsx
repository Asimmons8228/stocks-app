import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const StockChart = ({ symbol }) => {
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
        try {
            const response = await fetch(`/api/stocks/daily?symbol=${encodeURIComponent(symbol)}`);
            const fetchedData = await response.json();
            const timeSeriesData = fetchedData['Time Series (Daily)'];
            const labels = Object.keys(timeSeriesData).sort();
            const data = labels.map(date => parseFloat(timeSeriesData[date]['4. close'])); 
    
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
