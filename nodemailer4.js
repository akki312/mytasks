const twilio = require('twilio');

// Twilio credentials
const accountSid = 'ACd162eafc1667948933290a452b4c55be';
const authToken = '33eb1078378fafa1bce6cf501b1e8b80';
const twilioPhoneNumber = '+12513090858';

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

// Function to send OTP via SMS
function sendOTPBySMS(phoneNumber, otp) {
    client.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: '8008133369'
        })
        .then(message => console.log('SMS sent:', message.sid))
        .catch(error => console.error('Error sending SMS:', error));
}

// Example usage
const userPhoneNumber = '+1234567890'; // Recipient's phone number
const otp = generateOTP();

sendOTPBySMS(userPhoneNumber, otp);
