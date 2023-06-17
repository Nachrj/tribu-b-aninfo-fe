import React, { useState } from 'react';

const SelectState = ({label, options, value, ...rest }) => {
  
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  return ( 
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      {/* <select className="block text-gray-800 font-bold mb-4">{select}</select> */}
      <select value={currentValue} id="simple" name="simple" className="w-min px-6 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-800" onChange={handleChange}>
        
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))
        }
      </select>
    </div>
  );
};

export default SelectState;

/*
<select id="simple" name="simple">
  <option>Estado1</option>
  <option selected>Estado2</option>
  <option>Estado3</option>
</select>
*/