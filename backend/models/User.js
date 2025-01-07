const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const options = {
    timestamps: true,
};


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 5000
    },
  
},
  options);

const User = mongoose.model('User', userSchema);

module.exports = User;