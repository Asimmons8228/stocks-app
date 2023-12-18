export async function getStockData(symbol) {
    try {
        const response = await fetch(`/api/stocks/${symbol}`);
        if (!response.ok) throw new Error('Something went wrong fetching stock data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function searchStocks(query) {
    try {
        const response = await fetch(`/api/stocks/search?keywords=${query}`);
        if (!response.ok) throw new Error('Stock search failed');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}