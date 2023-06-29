import React, { FC, useState, useEffect } from 'react';

interface Props {
  value: number;
  options: any[];
  label: string;
  onChange: (a: any) => void;
}

const Select: FC<Props> = ({label, options, value, onChange}) => {
  
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (event: any) => {
    setCurrentValue(event.target.value);
    onChange(event.target.value);
  };
  
  useEffect(() => {  
    setCurrentValue(value);
  }, [value]);

  return ( 
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <select value={currentValue} id="simple" name="simple" className="w-min px-6 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-800" onChange={handleChange}>
        
        {options.map((option) => (
          <option key={option.key} value={option.key}>{option.label}</option>
        ))
        }
      </select>
    </div>
  );
};

export default Select;
