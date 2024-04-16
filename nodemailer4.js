const twilio = require('twilio');
const { MongoClient } = require('mongodb');

const accountSid = 'ACd162eafc1667948933290a452b4c55be';
const authToken = '33eb1078378fafa1bce6cf501b1e8b80';
const twilioPhoneNumber = '+12513090858';

const client = twilio(accountSid, authToken);
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000); 
}
async function sendOTPBySMSAndStoreInMongo(phoneNumber, otp) {
    client.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: '918008133369'
        })
        .then(async message => {
            console.log('SMS sent:', message.sid);

            const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'; // MongoDB connection URI
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            try {
                await client.connect();
                console.log('Connected to MongoDB');
                const database = client.db('smsdatabase');
                const collection = database.collection('otpCollection');
                await collection.insertOne({ phoneNumber, otp });
                console.log('OTP stored in MongoDB');
            } catch (error) {
                console.error('Error storing OTP in MongoDB:', error);
            } finally {
                await client.close();
                console.log('Disconnected from MongoDB');
            }
        })
        .catch(error => console.error('Error sending SMS:', error));
}


const userPhoneNumber = '+918008133369'; 
const otp = generateOTP();

sendOTPBySMSAndStoreInMongo(userPhoneNumber, otp);
