const https = require('https');
const querystring = require('querystring');

// Constants for Alpha Vantage API
const BASE_URL = 'www.alphavantage.co';
const API_PATH = '/query';

// Function to get stock data for a given symbol and time interval
const getStockData = (symbol, interval) => {
    return new Promise((resolve, reject) => {
        // Create query parameters for the API request
        const queryParams = querystring.stringify({
            function: 'TIME_SERIES_INTRADAY', 
            symbol: symbol,
            interval: interval, // Example: '5min', '15min', etc.
            apikey: process.env.ALPHA_VANTAGE_API_KEY
        });

        // Configure options for the HTTPS request
        const options = {
            hostname: BASE_URL,
            path: `${API_PATH}?${queryParams}`,
            method: 'GET'
        };

        // Initialize an HTTPS request
        const req = https.request(options, (res) => {
            let data = '';

            // Listen for data chunks and concatenate them
            res.on('data', (chunk) => {
                data += chunk; 
            });

            // Once all data is received, parse the JSON and resolve the promise
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        });

        // Handle errors in the request
        req.on('error', (e) => {
            reject(e);
        });

        // End the request (send it)
        req.end();
    });
};

// Export the function for use in other modules
module.exports = {
    getStockData
};
