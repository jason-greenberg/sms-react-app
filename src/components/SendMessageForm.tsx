import React, { useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui'
import './SendMessageForm.css'

interface SendMessageFormProps {
  onSubmit: (phoneNumber: string, message: string) => Promise<any>;
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const messageIsValid = message.length > 0;
    
    // Validates a North American phone number format, adjust as necessary for other formats.
    const phoneNumberIsValid = /^(\+1|1)?[2-9]\d{2}[2-9]\d{6}$/.test(phoneNumber);
  
    return messageIsValid && phoneNumberIsValid;
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await onSubmit(phoneNumber, message);
      if (result.status === "success") {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <TextInputField
          className="textInputField"
          label="Phone Number"
          value={phoneNumber}
          isInvalid={isSubmitted && phoneNumber.length === 0}
          validationMessage={isSubmitted && phoneNumber.length === 0 ? 'Phone number is required' : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
        <TextInputField
          className="textInputField"
          label="Message"
          value={message}
          isInvalid={isSubmitted && message.length === 0}
          validationMessage={isSubmitted && message.length === 0 ? 'Message is required' : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        />
        <Button 
          className="submitButton" 
          type="submit" 
          intent={isSuccess ? 'success' : 'none'}
          isLoading={isLoading}
        >
          Send Message
        </Button>
      </form>
    </div>
  )
}
