const nodemailer = require('nodemailer');

// Create a Nodemailer transporter with SMTP configuration
let transporter = nodemailer.createTransport({
    host: 'smtp@gmail.com',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'akshithsistla@gmail.com',
        pass: 'zqafotiblukmdrrk'
    }
});

// Define email details
let mailOptions = {
    from: 'akshithsistla@gmail.com',
    to: 'sistlaakshith@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js using Nodemailer.'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error Occurs:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
