const { MongoClient } = require("mongodb");
const { Twilio } = require("twilio");
const { FunctionContextImpl } = require("twilio/lib/rest/serverless/v1/service/function");
const { Message } = require("twilio/lib/twiml/MessagingResponse");

accountSid = 'ACd162eafc1667948933290a452b4c55be';
const authToken = '5c9e55f6a38c18214855a104be37e29e';
const twilioPhoneNumber = '+12513090858';
const client = twilio(accountSid, authToken);
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}
async function sendOTPBySMSAndStoreInMongo(phoneNumber, otp){
    client.messages
    .create({
        body:`your otp is: ${otp}`,
        from: twilioPhoneNumber,
        to: '+918008133369'
    })
    .then(async Message => {
        console.log('sms sent:', Message.sid);
        const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/'
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

        try {
            await client.connect();
            console.log('connected to mongoDB');
            const database = client.db('smsdatabase');
            const collection = database.collection('otpcollection');
            await collection.insertOne({ phoneNumber, otp});
            console.log('otp stored in MongoDB');
        } catch (error) {
            console.error('error storing otp in mongodb:', error);
        } finally {
            await client.close();
            console.log('disconnected form mongodb');
        }
    })
    .catch(error => console.error('error sending SMS:', error));
}

const userPhoneNumber = '+918008133369';
const otp = generateOTP();