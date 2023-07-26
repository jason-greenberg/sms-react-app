import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

const PORT = process.env.PORT || 5001
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
  throw new Error('Environment variables TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER are required');
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

const twilioClient = twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
)

interface SendMessageRequest {
  phoneNumber: string;
  message: string;
}

app.post(
  '/send',
  async (req: Request<{}, {}, SendMessageRequest>, res: Response) => {
    const { phoneNumber, message } = req.body

    try {
      await twilioClient.messages.create({
          body: message,
          from: TWILIO_PHONE_NUMBER,
          to: phoneNumber
        });

      return res.status(200).send({ message: 'Message sent successfully' });  
    } catch (err: any) {
      console.log('Error sending message', err);
      return res.status(500).send({ message: 'Error sending message' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
