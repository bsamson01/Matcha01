var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'matchaapp6@gmail.com',
        pass: 'brandon912680'
    }
});

function sendmail(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error)
            console.log(error);
        else
            console.log('Email sent: ' + info.response);
    })
}

module.exports = sendmail;