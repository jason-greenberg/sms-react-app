import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import path from 'path';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

// Check that necessary environment variables have been set
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
  throw new Error('Environment variables TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER are required');
}

// Initialize Express app
const app = express();

// Use cors and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Twilio client with account SID and auth token
const twilioClient = twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
)

// Define interface for expected request body
interface SendMessageRequest {
  phoneNumber: string;
  message: string;
}

// Endpoint route for sending message
app.post(
  '/api/send',
  async (req: Request<{}, {}, SendMessageRequest>, res: Response) => {
    const { phoneNumber, message } = req.body

    try {
      // Send message using Twilio client
      await twilioClient.messages.create({
          body: message,
          from: TWILIO_PHONE_NUMBER,
          to: phoneNumber
        });

      // Send success response
      return res.status(200).send({ message: 'Message sent successfully' });  
    } catch (err: any) {
      // Send error response
      console.log('Error sending message', err);
      return res.status(500).send({ message: 'Error sending message' });
    }
  }
);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve(__dirname, '../../frontend/build')));
  
  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Start server and listen on given port
app.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});
