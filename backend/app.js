import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import cloudinary from 'cloudinary';

dotenv.config({ path: './config/.env' });

const app = express();

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database connection
const dbConnection = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL is not defined');
        }

        await mongoose.connect(mongoUrl);
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

dbConnection();
app.use(express.urlencoded({ limit: '100mb', extended: true })); // Set URL-encoded payload limit


app.use(cookieParser());
app.use(express.json({ limit: '100mb' })); // Set JSON payload limit


// CORS and middleware setup
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/user', userRouter);

// Global error handling middleware
app.use(errorMiddleware);

export default app;
