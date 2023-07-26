import React, { useState, useEffect } from 'react'
import { Button, TextInputField } from 'evergreen-ui'
import './SendMessageForm.css'

interface SendMessageFormProps {
  onSubmit: (phoneNumber: string, message: string) => Promise<any>;
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [isMessageValid, setIsMessageValid] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Validates a North American phone number format, adjust as necessary for other formats.
    setIsPhoneNumberValid(/^(\+1|1)?[2-9]\d{2}[2-9]\d{6}$/.test(phoneNumber));
    setIsMessageValid(message.length > 0);
    setIsFormValid(isPhoneNumberValid && isMessageValid);
  }, [phoneNumber, message, isPhoneNumberValid, isMessageValid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
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
          isInvalid={!isPhoneNumberValid && phoneNumber !== ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
        {!isPhoneNumberValid && phoneNumber !== '' && message.length > 0 && <p className="errorText">Phone number is invalid</p>}
        <TextInputField
          className="textInputField"
          label="Message"
          placeholder="Appointment reminder"
          value={message}
          isInvalid={!isMessageValid && message !== ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        />
        {!isMessageValid && message !== '' && <p className="errorText">Message is required</p>}
        <Button 
          className="submitButton" 
          type="submit" 
          intent={isSuccess ? 'success' : 'none'}
          isLoading={isLoading}
          disabled={!isFormValid || isLoading}
        >
          Send Message
        </Button>
      </form>
    </div>
  )
}
