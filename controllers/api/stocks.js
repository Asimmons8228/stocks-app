const https = require('https');

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
