require('dotenv').config();
const yahooFinance = require('yahoo-finance2').default;

const fetchStockPrice = async (symbol) => {
    try {
        console.log(`Fetching data for symbol: ${symbol}`);

        const data = await yahooFinance.quote(symbol);

        
        const price = data.regularMarketPrice;

        if (price === undefined || price === null) {
            console.warn(`No valid price found for ${symbol}. Returning 0.`);
            return 0;  
        }

        console.log(`Price for ${symbol}: $${price}`);
        return price;
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error.message);
        return 0;  // Return a fallback value of 0 if there's an error fetching the price
    }
};
const fetchPrice = async (symbol, startDate, endDate) => {
    try {
        console.log(`Fetching historical data for symbol: ${symbol} from ${startDate} to ${endDate}`);

        // Fetch historical data using the Yahoo Finance API
        const data = await yahooFinance.historical(symbol, {
            period1: startDate, // Start date for historical data (format: 'YYYY-MM-DD')
            period2: endDate,   // End date for historical data (format: 'YYYY-MM-DD')
            interval: '1d',     // Daily interval (you can also use '1wk', '1mo', etc.)
        });

        // Map the data to extract only relevant fields (e.g., closing price and date)
        const historicalPrices = data.map(item => ({
            date: item.date,               // The date of the stock price
            closePrice: item.close,        // Closing price of the stock
        }));

        if (historicalPrices.length === 0) {
            console.warn(`No valid data found for ${symbol}.`);
            return [];
        }

        console.log(`Fetched ${historicalPrices.length} days of data for ${symbol}`);
        return historicalPrices;
    } catch (error) {
        console.error(`Error fetching historical data for ${symbol}:`, error.message);
        return [];  // Return an empty array if there's an error fetching the data
    }
};

module.exports = fetchStockPrice;
module.exports = fetchPrice;
