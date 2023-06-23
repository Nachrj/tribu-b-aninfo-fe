import React, { useState, useEffect } from 'react';

const Input = ({ label, value = '' , modify = true}) => {
  
  const handleChange = (event) => {
    if(modify)
      setInputValue(event.target.value);
  };  
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <input
        type='text'
        className="w-min px-3 py-2 border  rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black"  onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};

export default Input;