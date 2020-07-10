'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'brandon.samsonjnr00@gmail.com',
        pass: 'brandon912680'
    }
});

module.exports = transporter;