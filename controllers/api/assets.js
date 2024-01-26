const https = require('https');
const Asset = require('../../models/asset');

/**
 * Searches for stock symbols based on provided keywords using Alpha Vantage API.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function searchStocks(req, res) {
  // Extracting keywords from the request query
  const query = req.query.keywords;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  // Configuring options for the Alpha Vantage API request
  const options = {
    hostname: 'www.alphavantage.co',
    path: `/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`,
    method: 'GET',
  };

  let data = '';

  // Sending an HTTP GET request to Alpha Vantage API
  https.get(options, function (apiRes) {
    // Accumulating response data in chunks
    apiRes.on('data', function (chunk) {
      data += chunk;
    });

    // Handling the end of the response
    apiRes.on('end', function () {
      try {
        // Parsing the received JSON data
        const parsedData = JSON.parse(data);
        res.json(parsedData);
      } catch (error) {
        // Handling JSON parsing errors
        console.error('Error parsing JSON:', error);
        res.status(500).send('Error parsing JSON response');
      }
    });
  }).on('error', function (e) {
    // Handling HTTP request errors
    console.error(`Problem with request: ${e.message}`);
    res.status(500).send(e.message);
  });
}

/**
 * Retrieves daily time series data for a given stock symbol using Alpha Vantage API.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function getDailyTimeSeries(req, res) {
  // Extracting the stock symbol from the request query
  const symbol = req.query.symbol;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  // Configuring options for the Alpha Vantage API request
  const options = {
    hostname: 'www.alphavantage.co',
    path: `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`,
    method: 'GET',
  };

  let data = '';

  // Sending an HTTP GET request to Alpha Vantage API
  https.get(options, function (apiRes) {
    // Accumulating response data in chunks
    apiRes.on('data', function (chunk) {
      data += chunk;
    });

    // Handling the end of the response
    apiRes.on('end', function () {
      try {
        // Parsing the received JSON data
        const parsedData = JSON.parse(data);
        res.json(parsedData);
      } catch (error) {
        // Handling JSON parsing errors
        console.error('Error parsing JSON:', error);
        res.status(500).send('Error parsing JSON response');
      }
    });
  }).on('error', function (e) {
    // Handling HTTP request errors
    console.error(`Problem with request: ${e.message}`);
    res.status(500).send(e.message);
  });
}

/**
 * Creates a new asset in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function create(req, res) {
  // Assigning the user ID to the asset before creation
  req.body.user = req.user._id;

  try {
    // Creating a new asset using the provided data
    const asset = await Asset.create(req.body);
    console.log(asset);
    res.status(201).json({ message: 'Asset created successfully', asset });
  } catch (err) {
    // Handling errors during asset creation
    console.error(err);
    res.status(400).json({ error: 'Bad Credentials' });
  }
}

/**
 * Updates an existing asset in the database by its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function updateAsset(req, res) {
  console.log('request:', req.body);
  try {
    // Finding and updating the asset by its ID
    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedAsset);
    console.log('response:', updatedAsset);
  } catch (error) {
    // Handling errors during asset update
    console.error('Error updating asset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Retrieves an asset by its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getAssetById(req, res) {
  try {
    // Finding and returning the asset by its ID
    const asset = await Asset.findById(req.params.id);
    res.json(asset);
  } catch (error) {
    // Handling errors during asset retrieval
    console.error('Error fetching asset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Deletes an asset by its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function deleteAsset(req, res) {
  try {
    // Finding and deleting the asset by its ID
    await Asset.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    // Handling errors during asset deletion
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Retrieves all assets from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getAllAssets(req, res) {
  try {
    // Finding and returning all assets in the database
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    // Handling errors during asset retrieval
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Exports the functions to be used in other files
module.exports = {
  create,
  getAllAssets,
  searchStocks,
  updateAsset,
  getAssetById,
  deleteAsset,
  getDailyTimeSeries,
};

