const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../models/users');

router.get('/', function(req, res, next) {
    res.redirect('/home');
});

module.exports = router;