
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
function generateOTP() {
    return Math.floor(100000 + Math.random() * 9000);
}
async function sendOTPByEmail(email, otp) {
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
        subject: 'otp of application',
        text: `your otp is: ${otp}`
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('email sent:', info.response);
        const uri = 'mongodb+srv://akshithsistla:ccipnWsoxp5NQ0nm@cluster0.iljkeyx.mongodb.net/';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        const database = client.db('otpdatabase');
        const collection = database.collection('otpcollection');
        await collection.insertOne({ email, otp});
        console.log('otp stored in MOngodb');
     } catch(error) {
        console.error('error sending email or storing otp:', error);
      } finally {
        await client.close();
      }
}

const userEmail = 'sistlaakshith@gmail.com';
const otp = generateOTP();
sendOTPByEmail(userEmail, otp);
