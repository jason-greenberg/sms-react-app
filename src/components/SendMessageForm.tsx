import React, { useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui'

interface SendMessageFormProps {
  onSubmit: (phoneNumber: string, message: string) => void;
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(phoneNumber, message);
      }}
    >
      <TextInputField />
      <TextInputField />
      <Button type="submit">Send Message</Button>
    </form>
  )
}
