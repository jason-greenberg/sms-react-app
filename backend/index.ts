import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

const PORT = process.env.PORT || 5001

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/test', async (req: Request, res: Response) => {
  return res.json({ message: 'test' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
