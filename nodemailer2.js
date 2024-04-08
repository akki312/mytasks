const nodemailer = require('nodemailer');

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
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Example usage
const userEmail = 'sistlaakshith@gmail.com'; // Recipient's email address
const otp = generateOTP();

sendOTPByEmail(userEmail, otp);
