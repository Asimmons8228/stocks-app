/**
 * Fetches stock data for a specific symbol from the server.
 * @param {string} symbol - The stock symbol to fetch data for.
 * @returns {Promise} - A Promise that resolves to the fetched stock data.
 */
export async function getStockData(symbol) {
    try {
        // Fetch stock data for the specified symbol from the server
        const response = await fetch(`/api/stocks/${symbol}`);

        // Check if the response is successful; throw an error if not
        if (!response.ok) throw new Error('Something went wrong fetching stock data');

        // Parse the JSON data from the response and return it
        const data = await response.json();
        return data;
    } catch (error) {
        // Log any errors that occurred during the process
        console.error(error);
    }
}

/**
 * Searches for stocks based on the provided query keywords.
 * @param {string} query - The search query keywords.
 * @returns {Promise} - A Promise that resolves to the search results.
 */
export async function searchStocks(query) {
    try {
        // Fetch stock search results based on the provided query from the server
        const response = await fetch(`/api/stocks/search?keywords=${query}`);

        // Check if the response is successful; throw an error if not
        if (!response.ok) throw new Error('Stock search failed');

        // Parse the JSON data from the response and return it
        const data = await response.json();
        return data;
    } catch (error) {
        // Log any errors that occurred during the process
        console.error(error);
    }
}
