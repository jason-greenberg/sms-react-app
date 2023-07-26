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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseBody = await response.json();

      if(responseBody.message === 'Message sent successfully'){
        alert('Message sent!');
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      alert('Failed to send message.');
      console.error(err);
    }
  };


  return (
    <SendMessageForm onSubmit={onSubmit} />
  );
}

export default App;
