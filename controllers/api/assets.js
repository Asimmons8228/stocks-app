const https = require('https');
const Asset = require('../../models/asset');


//ticker lookup
async function searchStocks(req, res) {
  const query = req.query.keywords;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const options = {
      hostname: 'www.alphavantage.co',
      path: `/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`,
      method: 'GET',
  };

  let data = '';

  https.get(options, function(apiRes) {
      apiRes.on('data', function(chunk) {
          data += chunk;
      });
      apiRes.on('end', function() {
          try {
              const parsedData = JSON.parse(data);
              res.json(parsedData);
          } catch (error) {
              console.error('Error parsing JSON:', error);
              res.status(500).send('Error parsing JSON response');
          }
      });
  }).on('error', function(e) {
      console.error(`Problem with request: ${e.message}`);
      res.status(500).send(e.message);
  });
}

function getDailyTimeSeries(req, res) {
  const symbol = req.query.symbol; 
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const options = {
      hostname: 'www.alphavantage.co',
      path: `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`,
      method: 'GET',
  };

  let data = '';

  https.get(options, function(apiRes) {
      apiRes.on('data', function(chunk) {
          data += chunk;
      });
      apiRes.on('end', function() {
          try {
              const parsedData = JSON.parse(data);
              res.json(parsedData);
          } catch (error) {
              console.error('Error parsing JSON:', error);
              res.status(500).send('Error parsing JSON response');
          }
      });
  }).on('error', function(e) {
      console.error(`Problem with request: ${e.message}`);
      res.status(500).send(e.message);
  });
}

async function create(req, res) {
  req.body.user = req.user._id;

  try {
    const asset = await Asset.create(req.body);
    console.log(asset);
    res.status(201).json({ message: 'Asset created successfully', asset });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Bad Credentials' });
  }
}

async function getAllAssets(req, res) {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { create, getAllAssets, searchStocks, getDailyTimeSeries };
