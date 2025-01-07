const Portfolio = require('../models/Portfolio');
const fetchStockPrice = require('../utils/fetchPrice');
const User = require('../models/User');


//Add Stock

const addStock = async (req, res) => {
    const { userId, ticker, shares } = req.body;

    try {
        const price = await fetchStockPrice(ticker);

        const newStock = { ticker, shares, price };
        const portfolio = await Portfolio.findOneAndUpdate(
            { userId },
            { $push: { stocks: newStock } },
            { new: true, upsert: true }
        );

        res.status(201).json({ message: 'Stock added successfully', portfolio });
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
    const { userId, ticker } = req.body;

    try {
        // Find the portfolio for the given user
        const portfolio = await Portfolio.findOne({ user: userId });
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
const calculatePortfolioValue = async (req, res) => {
    try {
        const { userId } = req.params;
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        let totalValue = 0;
        for (const stock of portfolio.stocks) {
            const price = await fetchStockPrice(stock.ticker);
            totalValue += stock.shares * price;
        }

        return res.json({ userId, totalValue });
    } catch (error) {
        console.error('Error calculating portfolio value:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Assign random stocks to user portfolio
const assignRandomStocks = async (req, res) => {
    const stockList = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NFLX'];
    const randomStocks = [];

    while (randomStocks.length < 5) {
        const stock = stockList[Math.floor(Math.random() * stockList.length)];
        if (!randomStocks.some((s) => s.ticker === stock)) {
            randomStocks.push({
                ticker: stock,
                shares: Math.floor(Math.random() * 10) + 1, // Random shares between 1 and 10
            });
        }
    }

    try {
       
        const portfolio = new Portfolio({
            userId: req.body.userId,
            stocks: randomStocks,
        });
        await portfolio.save();
        res.status(201).json({ message: 'Portfolio created', portfolio });
    } catch (error) {
        console.error('Error creating portfolio:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { calculatePortfolioValue, assignRandomStocks, addStock, updateStock, deleteStock, buyStock, sellStock };
