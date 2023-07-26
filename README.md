# SMS React App

A simple SMS sending application built using React.js for the frontend, Express.js for the backend, and Twilio as the SMS gateway. 

## Project Structure

- **Backend**: Contains the Express.js server and the logic for sending SMS using Twilio.
- **Frontend**: Contains the React.js application where users can input a phone number and a message to send an SMS.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installing Dependencies

Navigate to the project root directory and install dependencies for both the backend and frontend:

```bash
npm install
cd backend
npm install
```

### Configuring Environment Variables
Navigate to the backend directory and create a .env file with your Twilio API credentials:

```bash
cd backend
touch .env
```
Open the .env file and add your Twilio API credentials, PORT, and NODE_ENV:

```bash
TWILIO_ACCOUNT_SID=<your-account-sid>
TWILIO_AUTH_TOKEN=<your-auth-token>
TWILIO_PHONE_NUMBER=<your-twilio-phone-number>
PORT=<your-desired-server-port-number>
NODE_ENV=<development>
```
### Running the Application
In the backend directory, start the Express.js server:

```bash
npm start
```
In a new terminal window, navigate to the project root directory and start the React.js application:

```bash
npm start
```

## Technologies
- Typescript
- React
- Evergreen-UI
- Twilio
- Node.js

This project is licensed under the MIT License.
