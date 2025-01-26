const jwt = require('jsonwebtoken');

const generateToken = (user, message, statusCode, res) => {
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Send response here
        res.status(statusCode).json({
            success: true,
            message,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                balance: user.balance,
            },
        });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ success: false, message: 'Failed to generate token' });
    }
};

module.exports = { generateToken };

const parseDurationToMilliseconds = (duration) => {
    const units = {
        ms: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };

    const parsedDuration = /^([\d.]+)([smhd])$/.exec(duration);
    if (!parsedDuration) {
        throw new Error(`Invalid duration format: ${duration}`);
    }

    const [, value, unit] = parsedDuration;
    const milliseconds = parseFloat(value) * units[unit];
    if (isNaN(milliseconds)) {
        throw new Error(`Invalid duration value: ${value}`);
    }

    return milliseconds;
};

module.exports = { generateToken, parseDurationToMilliseconds };
