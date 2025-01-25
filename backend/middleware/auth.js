
import jwt from 'jsonwebtoken'
import { User } from '../model/user.js'
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.clientToken;
        console.log(token);
        if (!token) {
            return res.status(401).send("Not Authenticated");
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded admin token:", decodedData);

        req.user = await User.findById(decodedData.id);
        if (!req.user) {
            console.log("User not found");
            return next();
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};