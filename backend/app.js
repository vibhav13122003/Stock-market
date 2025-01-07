const express = require('express');
const app = express();
const connectDB = require('./utils/db');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3000;
const userRouter = require('./router/userRouter');
const transactionRouter = require('./router/transaction');
const portfolioRoutes = require('./router/portfolio');

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/portfolio', portfolioRoutes);

app.listen(port, async () => {
    try {
        await connectDB(); // Connect to the database
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error(error.stack);
        process.exit(1);
    }
});
