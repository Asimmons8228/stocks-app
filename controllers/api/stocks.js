const https = require('https');


// Grabbing stock data
exports.getStockData = (req, res) => {
    const symbol = req.params.symbol;
    const options = {
        hostname: 'www.alphavantage.co',
        port: 443,
        path: `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
        method: 'GET',
};

const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => {
        data += chunk;
    });
    apiRes.on('end', () => {
        res.json(JSON.parse(data));
    });
});

apiReq.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    res.status(500).send(e.message);
});

apiReq.end();
};

//ticker lookup
exports.searchStocks = (req, res) => {
    const query = req.query.keywords;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY; 

    const options = {
        hostname: 'www.alphavantage.co',
        path: `/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`,
        method: 'GET',
    };

    let data = '';

    https.get(options, (apiRes) => {
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        apiRes.on('end', () => {
        res.json(JSON.parse(data));
    });
    }).on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        res.status(500).send(e.message);
    });
};