import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const Personal = () => {
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh'}}>
      <Header />
      <Sidebar />

      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: '20px', margintop: '50px' }}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" style={{ backgroundColor: 'black', color: 'white'}} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" style={{ backgroundColor: 'black', color: 'white' }} />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" style={{ backgroundColor: 'black', color: 'white' }} />
        </div>
        <div>
          <label htmlFor="address">Resident Address:</label>
          <input type="text" id="address" name="address" style={{ backgroundColor: 'black', color: 'white' }} />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" style={{ backgroundColor: 'black', color: 'white' }} />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <Select options={options} value={value} onChange={changeHandler} style={{ backgroundColor: 'black', color: 'white' }} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Personal;

