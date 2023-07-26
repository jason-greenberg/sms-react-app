import React from 'react';
import './App.css';
import { SendMessageForm } from './components/SendMessageForm';

function App() {

  return (
    <SendMessageForm onSubmit={onSubmit} />
  );
}

export default App;
