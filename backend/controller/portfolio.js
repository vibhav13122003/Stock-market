const Portfolio = require('../models/Portfolio');
const fetchStockPrice = require('../utils/fetchPrice');
const fetchPrice = require('../utils/fetchPrice');
const User = require('../models/User');


//Add Stock

const addStock = async (req, res) => {
    const { userId, ticker, shares } = req.body;

    try {
        // Fetch the stock price
        const price = await fetchStockPrice(ticker);

        // Find the portfolio for the user
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        // Check if the stock already exists in the portfolio
        const existingStock = portfolio.stocks.find(stock => stock.ticker === ticker);

        if (existingStock) {
            // If stock exists, update its shares
            existingStock.shares += shares;
        } else {
            // If stock does not exist, add a new stock entry
            const newStock = { ticker, shares, price };
            portfolio.stocks.push(newStock);
        }

        // Save the updated portfolio
        await portfolio.save();

        res.status(200).json({ message: 'Stock added/updated successfully', portfolio });
    } catch (error) {
        console.error('Error adding stock:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//Update Stock
const updateStock = async (req, res) => {
    const { userId, ticker, shares } = req.body;

    try {
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const stockIndex = portfolio.stocks.findIndex(stock => stock.ticker === ticker);
        if (stockIndex === -1) {
            return res.status(404).json({ error: 'Stock not found in portfolio' });
        }

        portfolio.stocks[stockIndex].shares = shares;
        await portfolio.save();

        res.status(200).json({ message: 'Stock updated successfully', portfolio });
    } catch (error) {
        console.error('Error updating stock:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//Delete Stock
const deleteStock = async (req, res) => {
   
    try {
        const { userId, ticker } = req.query;
        // Find the portfolio for the given user
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        // Check if the stock exists in the portfolio
        const stockIndex = portfolio.stocks.findIndex(stock => stock.ticker === ticker);
        if (stockIndex === -1) {
            return res.status(404).json({ error: 'Stock not found in portfolio' });
        }

        // Remove the stock from the portfolio
        portfolio.stocks.splice(stockIndex, 1);

        // Save the updated portfolio
        await portfolio.save();

        res.status(200).json({ message: 'Stock deleted successfully', portfolio });
    } catch (error) {
        console.error('Error deleting stock:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

////////Buy

const buyStock = async (req, res) => {
    const { userId, ticker, shares } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const price = await fetchStockPrice(ticker);
        const totalCost = price * shares;

        if (user.balance < totalCost) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        user.balance -= totalCost;
        await user.save();

        const portfolio = await Portfolio.findOneAndUpdate(
            { userId },
            {
                $push: { stocks: { ticker, shares, price } },
            },
            { new: true, upsert: true }
        );

        res.status(201).json({ message: 'Stock purchased successfully', portfolio, balance: user.balance });
    } catch (error) {
        console.error('Error buying stock:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Sell Stock 
const sellStock = async (req, res) => {
    const { userId, ticker, shares } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });

        const stockIndex = portfolio.stocks.findIndex(stock => stock.ticker === ticker);
        if (stockIndex === -1) {
            return res.status(404).json({ error: 'Stock not found in portfolio' });
        }

        const stock = portfolio.stocks[stockIndex];
        if (stock.shares < shares) {
            return res.status(400).json({ error: 'Insufficient shares to sell' });
        }

        const price = await fetchStockPrice(ticker);
        const totalEarnings = price * shares;

        user.balance += totalEarnings;
        await user.save();

        stock.shares -= shares;
        if (stock.shares === 0) {
            portfolio.stocks.splice(stockIndex, 1);
        }
        await portfolio.save();

        res.status(200).json({ message: 'Stock sold successfully', portfolio, balance: user.balance });
    } catch (error) {
        console.error('Error selling stock:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Calculate total portfolio value
// Calculate total portfolio value
const calculatePortfolioValue = async (req, res) => {
    try {
        const { userId } = req.params;
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        let totalValue = 0;
        const stocks=portfolio.stocks;
        for (const stock of portfolio.stocks) {
            const price = await fetchStockPrice(stock.ticker);

            if (price === 0) {
                console.warn(`Skipping stock ${stock.ticker} due to unavailable price.`);
                continue; // Skip this stock if the price is 0 (unavailable)
            }

            totalValue += stock.shares * price;
        }

        return res.json({ userId, totalValue, stocks });
    } catch (error) {
        console.error('Error calculating portfolio value:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Assign random stocks to user portfolio
const assignRandomStocks = async (req, res) => {
    const stockList = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NFLX'];

    const generateRandomStocks = () => {
        const randomStocks = [];
        while (randomStocks.length < 5) {
            const stock = stockList[Math.floor(Math.random() * stockList.length)];
            if (!randomStocks.some((s) => s.ticker === stock)) {
                randomStocks.push({
                    ticker: stock,
                    shares: Math.floor(Math.random() * 10) + 1,
                });
            }
        }
        return randomStocks;
    };

    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        console.log('Assigning portfolio to User ID:', userId);

        const randomStocks = generateRandomStocks();

        const portfolio = await Portfolio.findOneAndUpdate(
            { userId }, // Find by userId
            { $setOnInsert: { stocks: randomStocks } }, // Only set stocks if creating a new document
            { new: true, upsert: true } // Return the new document if created
        );

        res.status(200).json({ message: 'Portfolio retrieved or created', portfolio });
    } catch (error) {
        console.error('Error creating or retrieving portfolio:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Some endpoint for fetching stock data for a specific date range
const getStockDataForChart = async (req, res) => {
    const { ticker, startDate, endDate } = req.params;  // Make sure date format is YYYY-MM-DD

    try {
        const data = await fetchPrice(ticker, startDate, endDate);
        res.json({ chart: { result: [{ timestamps: data.map(item => item.date), close: data.map(item => item.closePrice) }] } });
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).send("Internal server error");
    }
};



module.exports = { calculatePortfolioValue, assignRandomStocks, addStock, updateStock, deleteStock, buyStock, sellStock, getStockDataForChart };
