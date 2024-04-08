const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akshithsistla@gmail.com', // Your Gmail email address
        pass: 'jhlt dikb ijol qclu' // Your Gmail password or app-specific password
    }
});

// Email content
const mailOptions = {
    from: 'akshithsistla@gmail.com', // Sender address
    to: 'sistlaakshith@gmail.com', // List of recipients
    subject: 'Test Email', // Subject line
    text: 'This is a test email sent from Node.js using Nodemailer.' // Plain text body
    // html: '<p>This is a test email sent from <b>Node.js</b> using <i>Nodemailer</i>.</p>' // HTML body
};

// Send email
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
