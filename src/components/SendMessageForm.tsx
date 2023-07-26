import React, { useState } from 'react'
import { Button, TextInputField } from 'evergreen-ui'
import './SendMessageForm.css'

interface SendMessageFormProps {
  onSubmit: (phoneNumber: string, message: string) => Promise<any>;
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);
  const [isMessageValid, setIsMessageValid] = useState<boolean>(true);

  const validateForm = () => {
    const messageIsValid = message.length > 0;
    setIsMessageValid(messageIsValid);
    
    // Validates a North American phone number format, adjust as necessary for other formats.
    const phoneNumberIsValid = /^(\+1|1)?[2-9]\d{2}[2-9]\d{6}$/.test(phoneNumber);
    setIsPhoneNumberValid(phoneNumberIsValid);
  
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
          placeholder="6502079920"
          value={phoneNumber}
          isInvalid={!isPhoneNumberValid}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
        {!isPhoneNumberValid && isSubmitted && <p className="errorText">Phone number is invalid</p>}
        <TextInputField
          className="textInputField"
          label="Message"
          placeholder="Appointment reminder"
          value={message}
          isInvalid={!isMessageValid}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        />
        {!isMessageValid && isSubmitted && <p className="errorText">Message is required</p>}
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
