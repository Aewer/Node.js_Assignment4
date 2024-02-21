const nodemailer = require('nodemailer');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

function sendEmail(emailDetails) {

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: emailDetails.to,
        subject: emailDetails.subject,
        text: emailDetails.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
        rl.close();
    });
}

rl.question('Enter recipient email address: ', (to) => {
    rl.question('Enter email subject: ', (subject) => {
        rl.question('Enter email text: ', (text) => {
            const emailDetails = {
                to: to,
                subject: subject,
                text: text
            };
            sendEmail(emailDetails);
        });
    });
});