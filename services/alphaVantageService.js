const https = require('https');
const querystring = require('querystring');

const BASE_URL = 'www.alphavantage.co';
const API_PATH = '/query';

const getStockData = (symbol, interval) => {
    return new Promise((resolve, reject) => {
        const queryParams = querystring.stringify({
            function: 'TIME_SERIES_INTRADAY', 
            symbol: symbol,
            interval: interval, //ex. '5min', '15min', etc.
            apikey: process.env.ALPHA_VANTAGE_API_KEY
    });

    const options = {
        hostname: BASE_URL,
        path: `${API_PATH}?${queryParams}`,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk; 
        });

        res.on('end', () => {
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                reject(e);
        }
    });
    });

    req.on('error', (e) => {
        reject(e);
    });

    req.end();
});
};

module.exports = {
    getStockData
};
