import React from 'react';
import './App.css';
import { SendMessageForm } from './components/SendMessageForm';

function App() {
  const onSubmit = async (phoneNumber: string, message: string) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, message })
      });

      alert('Message sent!');
    } catch (err) {
      alert('Failed to send message.');
      console.log(err);
    }
  };

  return (
    <SendMessageForm onSubmit={onSubmit} />
  );
}

export default App;
