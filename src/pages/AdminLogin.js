import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

// Create Supabase client instance
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseURL = 'https://pvdwlvsbwghrvngjxvmw.supabase.co';
const supabase = createClient(supabaseURL, supabaseKey);

const Login = () => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const walletaddress = event.target.walletAddress.value;

    // Check if the admin exists in the database
    const { data, error } = await supabase
      .from('admin')
      .select('walletaddress')
      .eq('walletaddress', walletaddress)
      .limit(1);

    if (error) {
      showMessage('Error retrieving admin data');
      console.error('Error retrieving admin data:', error.message);
      return;
    }

    if (data.length = 0) {
      showMessage('Invalid admin wallet address');
      return;
    }

    showMessage('Login successful');

    // Set the cookie or perform any other necessary actions
    // ...

    // Redirect to home page
    window.location.href = '/admin';
  };

  const showMessage = (message) => {
    setMessage(message);
  };

  const inputStyles = {
    // Add your input styles here
    // Example:
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  };
  
  const messageStyles = {
    // Add your message styles here
    // Example:
    color: 'red',
    marginTop: '8px',
  };
  
  const submitStyles = {
    // Add your submit button styles here
    // Example:
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2 className='h_login'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="walletAddress">Wallet Address:</label>
        <input type="text" id="walletAddress" required style={inputStyles} />
        <br />

        <div id="message" style={messageStyles} >{message}</div>
        <input type="submit" value="Login" style={submitStyles} />
      </form>
    </div>
  );
};

export default Login;
