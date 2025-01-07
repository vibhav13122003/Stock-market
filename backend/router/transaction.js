const {getTransactions} = require('../controller/transaction');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, getTransactions);

module.exports = router;