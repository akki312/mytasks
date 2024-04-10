const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Port for the Express.js server

// Function to generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

// Function to send OTP via email
async function sendOTPByEmail(email, otp) {
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
        to: 'sistlaakshith@gmail.com', // Recipient address
        subject: 'Your OTP', // Subject line
        text: `Your OTP is: ${otp}` // Plain text body
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}:`, info.response);
    } catch (error) {
        console.error(`Error sending OTP to ${email}:`, error);
    }
}

// API endpoint to send OTP emails
app.post('/send-otp', async (req, res) => {
    const { emails } = req.body; // Array of email addresses to send OTPs to
    try {
        for (const email of emails) {
            const otp = generateOTP();
            await sendOTPByEmail(email, otp);
        }
        res.status(200).json({ message: 'OTP emails sent successfully' });
    } catch (error) {
        console.error('Error sending OTP emails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
