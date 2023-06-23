import React, { useState, useEffect } from 'react';

const DescriptionInput = ({ label, value = '' }) => {

  const handleChange = (event) => {
      setInputValue(event.target.value);
  };  
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);


  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <textarea
        value={inputValue}
        className="resize-none   overflow-hidden w-full block py-4 border rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black" onChange={handleChange}
      />
      
    </div>
  );
};

export default DescriptionInput;