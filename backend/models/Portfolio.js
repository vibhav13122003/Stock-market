const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const options = {
  timestamps: true,
};

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    stocks: [
      {
        ticker: {
          type: String,
          required: true,
        },
        shares: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  options
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
