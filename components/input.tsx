import React, { FC, useState, useEffect } from 'react';

type InputProps = {
  label: string;
  value: string;
  modify: boolean;
  onChange: (a: string) => void;
};

const Input: FC<InputProps> = ({ label, value = '' , modify = true, onChange}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event: any) => {
    if(modify)
      setInputValue(event.target.value);
      onChange(event.target.value);
  };  

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <input disabled={!modify}
        type='text'
        className="w-min px-3 py-2 border  rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black"  onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};

export default Input;