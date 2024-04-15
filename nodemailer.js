const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akshithsistla@gmail.com', 
        pass: 'jhlt dikb ijol qclu' 
    }
});


const mailOptions = {
    from: 'akshithsistla@gmail.com', 
    to: 'sistlaakshith@gmail.com', 
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js using Nodemailer.' 
    
};


transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
