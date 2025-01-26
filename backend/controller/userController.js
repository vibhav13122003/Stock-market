const ErrorHandler = require('../middleware/errorMiddleware');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/jwt');


const registerUser = async (req, res, next) => {
    const { name, email, password, balance } = req.body;
    console.log("Request Body:", req.body);

    if (!name || !email || !password || !balance) {
        return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    if (name.length < 3 || name.length > 50) {
        return res.status(400).json({ error: 'Name must be between 3 and 50 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hash,
            balance,
        });
        console.log('User Created:', user);

        // Call generateToken and let it handle the response
        return generateToken(user, 'User registered successfully', 201, res);

    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        generateToken(user, 'User logged in successfully', 200, res);
    } catch (error) {
        return res.status(500).json({ error: 'Error logging in user' });
    }
};



module.exports = { registerUser, loginUser };
