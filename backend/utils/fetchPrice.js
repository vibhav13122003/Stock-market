require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=I08HBF79JZ2IN23Y';

const fetchStockPrice = async (symbol) => {
    try {
        const response = await axios.get(BASE_URL);
        const data = response.data['Global Quote'];
        if (!data) {
            throw new Error(`No data for symbol: ${symbol}`);
        }
        return parseFloat(data['05. price']);
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error.message);
        throw error;
    }
};

module.exports = fetchStockPrice;
