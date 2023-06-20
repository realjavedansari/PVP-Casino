import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SHA256 } from 'crypto-js';
import { Link } from 'react-router-dom';

// Create Supabase client instance
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseURL = 'https://pvdwlvsbwghrvngjxvmw.supabase.co';
const supabase = createClient(supabaseURL, supabaseKey);

const Login = () => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const authid = generateAuthId();
    const hashedAuthid = hashAuthId(authid);

    // Get form values
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Update the database column
    const { data, error } = await supabase
      .from('signup')
      .update({ authid: hashedAuthid })
      .eq('email', email)
      .eq('password', password);

    if (error) {
      showMessage('Password does not match');
      console.error('Error updating the column:', error.message);
      return;
    } else {
      showMessage('Password matches');
      console.log('Column updated successfully');

      // Set the cookie
      setCookie('authid', hashedAuthid, 1);

      // Redirect to home page
      window.location.href = '/admin'; // Redirect to the home page
    }
  };

  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  };

  const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomId;
  };

  const generateAuthId = () => {
    const randomId = generateRandomId(16); // Generate a random string with 16 characters
    return randomId;
  };

  function hashAuthId(authid) {
    const hashedAuthId = SHA256(authid).toString();
    return hashedAuthId;
  }
  

  const showMessage = (message) => {
    setMessage(message);
  };

  return (
    <div>
      <h2 className='h_login'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" required />
        <br />
        <div id="message">{message}</div>
        <input type="submit" value="Login" />
      </form>
      
    </div>
  );
};

export default Login;
