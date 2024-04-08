const twilio = require('twilio');
const { MongoClient } = require('mongodb');

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

// Function to send OTP via SMS and store in MongoDB
async function sendOTPBySMSAndStoreInMongo(phoneNumber, otp) {
    // Send OTP via SMS
    client.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        })
        .then(async message => {
            console.log('SMS sent:', message.sid);

            // Store OTP in MongoDB
            const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // MongoDB connection URI
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            try {
                // Connect to MongoDB
                await client.connect();
                console.log('Connected to MongoDB');

                // Insert OTP into MongoDB collection
                const database = client.db('smsdatabase');
                const collection = database.collection('otpCollection');
                await collection.insertOne({ phoneNumber, otp });
                console.log('OTP stored in MongoDB');
            } catch (error) {
                console.error('Error storing OTP in MongoDB:', error);
            } finally {
                // Close MongoDB connection
                await client.close();
                console.log('Disconnected from MongoDB');
            }
        })
        .catch(error => console.error('Error sending SMS:', error));
}

// Example usage
const userPhoneNumber = '+918008133369'; // Recipient's phone number
const otp = generateOTP();

sendOTPBySMSAndStoreInMongo(userPhoneNumber, otp);
