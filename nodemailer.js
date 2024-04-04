const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akshithsistla@gmail.com',
        pass: 'Akki@8008'
    }
});

let mailDetails = {
    from: 'akshithsistla@gmail.com',
    to: 'sistlaakshith@gmail.com',
    subject: 'Test mail',
    text: 'testing mail'
};

mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.error('Error Occurs:', err);
    } else {
        console.log('Email sent successfully');
    }
});
