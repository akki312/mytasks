const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your SMTP server configuration
    auth: {
        user: 'akshithsistla@gmail.com',
        pass: 'Akki@8008'
    }
});

const mailOptions = {
    from: 'akshithsistla@gmail.com',
    to: 'sistlaakshith@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email.'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.error(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
